import mongoose from "mongoose";
import * as valid from "../utils/validator.js";

const youtubeSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      validate: valid.required("Video Id"),
    },
    title: {
      type: String,
      validate: valid.required("Title"),
    },
    subtitle: {
      type: String,
      validate: valid.required("Subtitle"),
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
