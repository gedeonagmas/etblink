const mongoose = require("mongoose");
const valid = require("../utils/validator");

const boostModel = new mongoose.Schema(
  {
    name: {
      type: String,
      validate: valid.required("Name"),
    },

    amount: {
      type: Number,
      validate: valid.numberLower("Amount", 0),
    },

    duration: {
      type: String,
      validate: valid.required("Duration"),
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

boostModel.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Boost = mongoose.model("boost", boostModel);
module.exports = { Boost };
