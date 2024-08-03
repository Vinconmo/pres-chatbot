'use strict';
require("dotenv").config();


const {getAnswer} = require('./gemini.js');
const message = require('../models/message.js');

const getAll = async ctx => {
  try {
    ctx.body = await message.find();
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};

const post = async ctx => {
  try {
    const msg = ctx.request.body
    const postMsg = await message.create(msg);
    const answer = await getAnswer(msg.content)
    const answerMsg = {content: answer, authorId: false}
    const postAnswer = await message.create(answerMsg)
    const res = {
      user: postMsg,
      model: postAnswer,
    }
    ctx.status = 200;
    ctx.body = res
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};

module.exports = {
  getAll,
  post,
}
