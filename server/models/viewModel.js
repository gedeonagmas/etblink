import mongoose from "mongoose";
import * as valid from "../utils/validator.js";
import { Company } from "./companyModel.js";

const viewSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },

    role: {
      type: String,
    },

    viewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        return this.role === "visitor"
          ? "visitor"
          : this.role === "company"
          ? "company"
          : this.role === "sales"
          ? "sales"
          : "admin";
      },
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

viewSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

export const View = mongoose.model("view", viewSchema);
