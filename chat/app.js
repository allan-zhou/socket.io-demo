var log4js = require('log4js');
var logger = log4js.getLogger('server');
logger.level = 'debug';
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server,{
    path:'/test'
});
var dateFormat = require('dateformat');
var port = process.env.PORT || 3000;


io.on('connection', (socket) => {
    socket.on('message', (data) => {
        logger.debug('server fire event:[message]-' + data);
        // socket.to(socket.roomid).emit('message', {
        //     username: socket.username,
        //     message: data,
        //     time: dateFormat(new Date(),'mm-dd HH:MM:ss')
        // })
        io.in(socket.roomid).emit('message', {
            username: socket.username,
            message: data,
            time: dateFormat(new Date(),'mm-dd HH:MM:ss')
        })
    });

    socket.on('broadcast',(data) => {
        logger.debug('server fire event:[broadcast]-' + data);
        socket.broadcast.emit('broadcast',{
            username: socket.username,
            message: data,
            time: dateFormat(new Date(),'mm-dd HH:MM:ss')
        })
    })

    socket.on('disconnect', () => {
        logger.debug('server fire event:[disconnect]');

        socket.to(socket.roomid).emit('leave',{
            username: socket.username,
            message:`${socket.username} 离开了 ${socket.roomid} 聊天`,
            time: dateFormat(new Date(),'mm-dd HH:MM:ss')
        });
    });

    // response the client join the chat
    socket.on('join', (data) => {
        logger.debug('server fire event:[join]');
        
        socket.username = data.username;
        socket.roomid = data.roomid;

        socket.join(data.roomid,() => {
            logger.debug("=========socket=======");
            logger.debug(socket);
            logger.debug("socket.id : " + socket.id);
            logger.debug("socket.rooms :" + socket.rooms);
            logger.debug("socket.rooms.length: " + Object.keys(socket.rooms).length);
            logger.debug("socket.adapter.rooms: " + Object.keys(socket.adapter.rooms).length);

            socket.to(socket.roomid).emit('join', {
                username: data.username,
                message: `${data.username} 加入了 ${socket.roomid} 聊天`,
                time: dateFormat(new Date(),'mm-dd HH:MM:ss')
            });
    
        })
    });
})

app.use(express.static('public'));

server.listen(port, () => {
    logger.info(`server start at port: ${port}`);
})


