// require('dotenv').config({path: './.env'});
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEM_API_KEY);

const genModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 100,
    temperature: 1,
  },
});

module.exports = {
  genModel,
};
