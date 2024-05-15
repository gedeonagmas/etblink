const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model("image", schema);
module.exports = { Image };
