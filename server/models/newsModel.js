const mongoose = require("mongoose");
const valid = require("../utils/validator");

const newsSchema = new mongoose.Schema(
  {
    newsPhoto: {
      type: String,
      validate: valid.required("Photo"),
    },
    title: {
      type: String,
      validate: valid.required("Title"),
    },
    category: {
      type: String,
      enum: ["local", "global"],
      default: "local",
      validate: valid.required("Category"),
    },
    description: {
      type: String,
      validate: valid.required("Description"),
    },
    date: {
      type: String,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

newsSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const News = mongoose.model("news", newsSchema);
module.exports = { News };
