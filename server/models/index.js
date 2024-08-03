const mongoose = require('mongoose');
const conf = require('../config');

const connectDb = async () => {
  await mongoose.connect(`mongodb://localhost:27017/${conf.dbName}`, {useNewUrlParser: true, useUnifiedTopology: true});
  console.log('Mongoose DB connected')
}

module.exports = {
  connectDb
}
