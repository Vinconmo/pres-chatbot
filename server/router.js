'use strict';

const Router = require('koa-router');
const router = new Router();

const message = require('./controllers/message.js');

router.get('/messages', message.getAll);
router.post('/messages', message.post);

module.exports = router;
