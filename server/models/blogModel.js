import mongoose, { Schema } from "mongoose";
import * as valid from "../utils/validator.js";

const blogModel = new Schema(
  {
    title: {
      type: String,
      validate: valid.required("Title"),
    },

    subTitle: {
      type: String,
      validate: valid.required("Sub title"),
    },

    blogImage: {
      type: String,
      validate: valid.required("Image"),
    },

    description: {
      type: String,
      validate: valid.paragraph("Description", 20, 3000),
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

blogModel.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

export const Blog = mongoose.model("blog", blogModel);
