const mongoose = require("mongoose");
const valid = require("../utils/validator");

const blogModel = new mongoose.Schema(
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

const Blog = mongoose.model("blog", blogModel);
module.exports = { Blog };
