const mongoose = require("mongoose");
const valid = require("../utils/validator");

const boostHistorySchema = new mongoose.Schema(
  {
    boost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "boost",
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },

    startDate: {
      type: Number,
      default: 0,
    },

    endDate: {
      type: Number,
      default: 0,
    },

    paymentMethod: {
      type: String,
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

boostHistorySchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const BoostHistory = mongoose.model("boosthistory", boostHistorySchema);
module.exports = { BoostHistory };
