const mongoose = require("mongoose");
const valid = require("../utils/validator");

const placeSchema = new mongoose.Schema(
  {
    city: {
      type: [String],
      // validate: valid.required("City"),
    },

    country: {
      type: [String],
      // validate: valid.required("Country"),
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

placeSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Place = mongoose.model("Place", placeSchema);
module.exports = { Place };
