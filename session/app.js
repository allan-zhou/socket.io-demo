const log4js = require('log4js');
const logger = log4js.getLogger('session-app');
logger.level = 'debug';
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const app = express();
const port = process.env.PORT || 4000;

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

app.get('/',(req, res) => {
    logger.debug('==== req.sessionID ====');
    logger.debug(req.sessionID);
    logger.debug(req.session);
    if(req.session.views){
        req.session.views++;
        res.setHeader('Content-Type','text/html');
        res.write(`<p>views: ${req.session.views}</p>`);
        res.write(`<p>sessionID: ${req.sessionID}</p>`);
        res.write(`<p>expires in: ${req.session.cookie.maxAge } ms</p>`);
        res.end();
    } else{
        req.session.views = 1;
        res.end('welcome, refresh!');
    }
})


app.listen(port);
logger.info(`=========== server start at port:${port} =========`);
