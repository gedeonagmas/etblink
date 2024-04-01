import mongoose from "mongoose";
import * as valid from "../utils/validator.js";

const privateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      validate: function () {
        return this.userType === "business" ? null : valid.name("First name");
      },
    },

    middleName: {
      type: String,
      validate: function () {
        return this.userType === "business" ? null : valid.name("Middle name");
      },
    },

    lastName: {
      type: String,
      validate: function () {
        return this.userType === "business" ? null : valid.name("Last name");
      },
    },

    gender: {
      type: String,
      validate: function () {
        return this.userType === "business" ? null : valid.gender("Gender");
      },

      phone: {
        type: String,
        validate: valid.phone("Phone"),
      },

      address: {
        type: String,
        validate: valid.paragraph("Address", 4, 200),
      },

      nationality: {
        type: String,
        validate: valid.paragraph("Nationality", 4, 100),
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

privateSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

export const Private = mongoose.model("private", privateSchema);
