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
    subTitle: {
      type: String,
      validate: valid.required("Sub Title"),
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

    role: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userProfile",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userProfile",
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

newsSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const News = mongoose.model("news", newsSchema);
module.exports = { News };
