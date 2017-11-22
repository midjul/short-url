const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "URL must be specified"]
  }
});
const urlModel = mongoose.model("Url", urlSchema);

module.exports = urlModel;
