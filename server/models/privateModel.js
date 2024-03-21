import mongoose from "mongoose";
import * as valid from "../utils/validator.js";

const privateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      validate: function () {
        return this.userType === "business" ? null : valid.name("First name");
      },
      // required: function () {
      //   return this.userType === "business"
      //     ? false
      //     : [true, "First name is required"];
      // },
    },

    middleName: {
      type: String,
      validate: function () {
        return this.userType === "business" ? null : valid.name("Middle name");
      },
      // required: function () {
      //   return this.userType === "business"
      //     ? false
      //     : [true, "Middler name is required"];
      // },
    },

    lastName: {
      type: String,
      validate: function () {
        return this.userType === "business" ? null : valid.name("Last name");
      },
      // required: function () {
      //   return this.userType === "business"
      //     ? false
      //     : [true, "Last name is required"];
      // },
    },

    gender: {
      type: String,
      validate: function () {
        return this.userType === "business" ? null : valid.gender("Gender");
      },
      // required: function () {
      //   return this.userType === "business"
      //     ? false
      //     : [true, "Gender is required"];
      // },
    },

    // userName: {
    //   type: String,
    //   // unique: [true, "This user name address is taken"],
    //   validate: valid.userName("User name"),
    //   // required: [true, "User name is required"],
    // },

    phone: {
      type: String,
      validate: valid.phone("Phone"),
      // required: [true, "Phone is required"],
    },

    address: {
      type: String,
      validate: valid.paragraph("Address", 4, 200),
      // required: [true, "Address is required"],
    },

    // role: { type: String, default: "customer" },

    nationality: {
      type: String,
      validate: valid.paragraph("Nationality", 4, 100),
    },
    // userType: { type: String, required: [true, "User type is required"] },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: function () {
    //     return this.userType === "lawyer"
    //       ? "lawyer"
    //       : this.userType === "business"
    //       ? "institute"
    //       : this.userType === "representative"
    //       ? "caseManager"
    //       : this.userType === "superAdmin"
    //       ? "superAdmin"
    //       : "user";
    //   },
    // },
    // password: {
    //   type: String,
    //   select: false,
    //   validate: valid.password("Password"),
    // },
    // permission: {
    //   type: Object,
    // },
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
