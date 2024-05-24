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

    role: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        return this.role === "admin" ? "admin" : "blog-admin";
      },
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        return this.role === "admin" ? "admin" : "blog-admin";
      },
    },

    visible: {
      type: Boolean,
      default: true,
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
