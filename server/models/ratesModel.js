import mongoose from "mongoose";
import * as valid from "../utils/validator.js";

const rateSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      validate: valid.paragraph("Full name", 4, 100),
    },

    message: {
      type: String,
      validate: valid.required("Message"),
    },

    value: {
      type: Number,
      validate: valid.numberLower("Value", 1),
    },

    rater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        return this.role === "visitor"
          ? "visitor"
          : this.role === "company"
          ? "company"
          : this.role === "seller"
          ? "seller"
          : "admin";
      },
    },

    accepter: {
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
rateSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});
export const Rate = mongoose.model("rate", rateSchema);
