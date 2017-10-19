const log4js = require('log4js');
const logger = log4js.getLogger('monitor-app');
logger.level = 'debug';
const express = require('express');
const app = express();

app.use(express.static('assets'));
app.use(express.static('public'));

app.use('/admin', express.static('admin'));

app.use('/api', require('./routes/api.js'));

module.exports = app;