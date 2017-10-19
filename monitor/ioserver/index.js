const log4js = require('log4js');
const logger = log4js.getLogger('monitor-ioserver');
logger.level = 'debug';
const io = require('socket.io')();

io.on('connection', (socket) => {
    socket.on('appdownload', (data) => {
        // todo: save to DB

        // todo: broadcast.emit [appdownload] enevt
        logger.debug('server on event: [appdownload]');
        socket.broadcast.emit('appdownload', data);
    })
});

function ioServer(server) {
    io.attach(server);
}

module.exports = ioServer;