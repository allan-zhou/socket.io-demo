const log4js = require('log4js');
const logger = log4js.getLogger('monitor-api');
logger.level = 'debug';
const express = require('express');
const api = express.Router();
const config = require('../config')
const socket = require('socket.io-client')(config.socketUri);

const data = require('../db/db.json');


api.get('/appdownload', (req, res, next) => {
    // todo: fetch from DB
    res.json(data);
})

api.post('/appdownload/:id', (req, res, next) => {
    // todo: fetch and update to DB

    var id = req.params.id;
    data.find((element) => {
        return element.id == id;
    }).count += 1;

    // todo: emit [appdownload] event
    socket.emit('appdownload', data);

    res.json(data);
})


module.exports = api;