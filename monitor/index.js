const log4js = require('log4js');
const logger = log4js.getLogger('monitor-server');
logger.level = 'debug';
const app = require('./app');
const server = require('http').createServer(app);
const ioServer = require('./ioserver/index')(server);//初始化 socket.io server
const config = require('./config.js');
const port = process.env.PORT || config.port;

server.listen(port,() => {
    logger.debug(`server start at port : ${port}`);
});



