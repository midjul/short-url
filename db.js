const mongoose = require("mongoose");

const config = require("./config");

mongoose.Promise = global.Promise;

mongoose.connect(config.mongodbURL, {
  useMongoClient: true
});

module.exports = mongoose;
