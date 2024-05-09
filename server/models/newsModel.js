import mongoose from "mongoose";
import * as valid from "../utils/validator.js";

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

export const News = mongoose.model("news", newsSchema);
