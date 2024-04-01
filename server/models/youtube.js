import mongoose from "mongoose";
import * as valid from "../utils/validator.js";

const youtubeSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      validate: valid.required("Link"),
    },
    title: {
      type: String,
      validate: valid.required("Title"),
    },
    subTitle: {
      type: String,
      validate: valid.required("Sub title"),
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

youtubeSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

export const Youtube = mongoose.model("youtube", youtubeSchema);
