var log4js = require('log4js');
var logger = log4js.getLogger('chat02-app.js');
logger.level = 'debug';
var fs = require('fs');
var path = require('path');
var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var app = express();
var server = require('http').createServer(app);
// var dateFormat = require('dateformat');
// var redisAdapter = require('socket.io-redis');
var chatServer = require('./src/chat.js')(server);//初始化 socket.io server
var port = process.env.PORT || 3000;

//
//============= http server config =================
//
app.use(session({
    secret: 'secret',
    store: new RedisStore({
        host:'localhost',
        port:6379,
        db:1, //设置DB number
    }),
    name: 'SessionID',
    cookie:{
        maxAge:60000 //60秒
    }
}));

// app.use(express.static('public'));

app.get('/',(req, res) => {
    logger.debug("req.sessionID");
    logger.debug(req.sessionID);
    fs.createReadStream(path.join(__dirname + '/public/index.html')).pipe(res);
});

server.listen(port, () => {
    logger.info(`server start at port: ${port}`);
});


