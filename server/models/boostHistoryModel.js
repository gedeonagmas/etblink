import mongoose, { Schema } from "mongoose";
import * as valid from "../utils/validator.js";

const boostHistorySchema = new Schema(
  {
    boost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "boost",
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
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

export const BoostHistory = mongoose.model("boostHistory", boostHistorySchema);
