import mongoose, { Schema } from "mongoose";
import * as valid from "../utils/validator.js";

const subscriptionHistorySchema = new Schema(
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

export const SubscriptionHistory = mongoose.model(
  "subscriptionHistory",
  subscriptionHistorySchema
);
