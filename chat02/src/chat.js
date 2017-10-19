var log4js = require('log4js');
var logger = log4js.getLogger('chat02-chat.js');
logger.level = 'debug';
var dateFormat = require('dateformat');
var redisAdapter = require('socket.io-redis');
// var redis = require('redis');
// var redisClient = redis.createClient;
var io = require('socket.io')();
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

io.on('connection', (socket) => {

    socket.on('join', (data) => {

        io.of('/').adapter.remoteJoin(socket.id, data.roomid, (err) => {
            if(err) return;

        })
    })
    // socket.emit('msgReceived', 'a message');
})

function ChatServer(server) {
    io.attach(server);
}

module.exports = ChatServer;
