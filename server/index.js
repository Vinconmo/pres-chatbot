'use strict';

const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const cors = require("@koa/cors");
const router = require('./router.js');
const {connectDb} = require('./models/index.js');

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

const port = 3000;

(async () => {
  await connectDb();
  app.listen(port);
  console.log(`Server listening on port ${port}`); // eslint-disable-line no-console
})()
