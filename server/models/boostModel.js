import mongoose, { Schema } from "mongoose";
import * as valid from "../utils/validator.js";

const boostModel = new Schema(
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

export const Boost = mongoose.model("boost", boostModel);
