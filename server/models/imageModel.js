import mongoose from "mongoose";

const schema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});

export const Image = mongoose.model("image", schema);
