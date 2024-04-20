import mongoose, { Schema } from "mongoose";
import * as valid from "../utils/validator.js";

const pricesModel = new Schema(
  {
    amount: {
      type: Number,
      validate: valid.numberLower("Amount",0),
    },

    type: {
      type: String,
      validate: valid.required("Type"),
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

pricesModel.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

export const Price = mongoose.model("price", pricesModel);
