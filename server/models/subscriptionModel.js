const mongoose = require("mongoose");
const valid = require("../utils/validator");

const subscriptionModel = new mongoose.Schema(
  {
    amount: {
      type: Number,
      validate: valid.numberLower("Amount", 0),
    },

    type: {
      type: String,
      validate: valid.required("Type"),
    },

    For: {
      type: String,
      validate: valid.required("Duration type"),
    },

    duration: {
      type: String,
      validate: valid.required("Duration"),
    },

    description: {
      type: String,
      validate: valid.paragraph("Description", 20, 300),
    },

    features: {
      type: [String],
      validate: valid.required("Features"),
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

subscriptionModel.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Subscription = mongoose.model("subscription", subscriptionModel);
module.exports = { Subscription };
