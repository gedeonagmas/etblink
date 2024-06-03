const mongoose = require("mongoose");
const valid = require("../utils/validator");

const sponsorSchema = new mongoose.Schema(
  {
    sponsorImage: {
      type: String,
      validate: valid.required("Sponsor image"),
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

sponsorSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Sponsor = mongoose.model("sponsor", sponsorSchema);
module.exports = { Sponsor };
