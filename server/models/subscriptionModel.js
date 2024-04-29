import mongoose, { Schema } from "mongoose";
import * as valid from "../utils/validator.js";

const subscriptionModel = new Schema(
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
      validate: valid.required("For"),
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

export const Subscription = mongoose.model("subscription", subscriptionModel);
