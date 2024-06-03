const mongoose = require("mongoose");
const valid = require("../utils/validator");

const bannerSchema = new mongoose.Schema(
  {
    bannerImage: {
      type: String,
      validate: valid.required("Banner image"),
    },

    type: {
      type: String,
      validate: valid.required("Type"),
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

bannerSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Banner = mongoose.model("banner", bannerSchema);
module.exports = { Banner };
