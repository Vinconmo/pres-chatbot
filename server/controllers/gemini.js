const Message = require("../models/message");
const {genModel} = require("../models/gemini")

let chat;

(async () => {
  let history = {
    user: [],
    model: [],
  };

  const user = await Message.find({ authorId: true });
  const model = await Message.find({ authorId: false });
  user.forEach((el) => history.user.push({ text: el.content }));
  model.forEach((el) => history.model.push({ text: el.content }));

  chat = genModel.startChat({
    history: [
      {
        role: "user",
        parts: history.user,
      },
      {
        role: "model",
        parts: history.model,
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
      temperature: 1,
    },
  });
})();

async function getAnswer(msg) {
  try {
    const message = `Please answer my message. Send you answer always in plain text without any formatting, including but not exclusive to bold or italics. My message: ${msg}`;
    // !
    const result = await chat.sendMessage(message);
    // const result = await genModel.generateContent(message);
    // !

    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      content: "",
      authorId: false,
      timestamp: Date.now(),
    };
  }
}

module.exports = {
  getAnswer,
};
