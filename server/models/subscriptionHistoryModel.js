const mongoose = require("mongoose");
const valid = require("../utils/validator");

const subscriptionHistorySchema = new mongoose.Schema(
  {
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscription",
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

subscriptionHistorySchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const SubscriptionHistory = mongoose.model(
  "subscriptionHistory",
  subscriptionHistorySchema
);
module.exports = { SubscriptionHistory };
