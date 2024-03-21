import mongoose from "mongoose";
import * as valid from "../utils/validator.js";

const lawyerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "gedeon",
      validate: valid.name("First name"),
    },

    middleName: {
      default: "gedeon",
      type: String,
      validate: valid.name("Middle name"),
    },

    lastName: {
      default: "gedeon",
      type: String,
      validate: valid.name("Last name"),
    },

    gender: {
      default: "Male",
      type: String,
      validate: valid.gender("Gender"),
    },

    phone: {
      default: "0954104637",
      type: String,
      validate: valid.phone("Phone"),
    },

    address: {
      default: "gedeon",
      type: String,
      validate: valid.paragraph("Address", 4, 200),
    },

    nationality: {
      default: "gedeon",
      type: String,
      validate: valid.paragraph("Nationality", 4, 100),
    },

    ID: {
      default: "gedeon",
      type: String,
    },

    acquireLicense: {
      default: false,
      type: Boolean,
    },

    licenseNo: {
      default: "gedeon",
      type: String,
    },

    levelOfEducation: {
      type: String,
      enum: ["LLB", "LLM", "PHD"],
      default: "LLB",
    },

    areaOfExpertise: {
      default: "gedeon",
      type: String,
    },

    yearOfExperience: {
      default: 5,
      type: Number,
    },

    preferenceArea: {
      default: "gedeon",
      type: [String],
    },

    yearOfExpire: {
      default: new Date(),
      type: Date,
    },

    resumeAndCoverLetter: {
      default: "gedeon",
      type: String,
    },

    additionalDocuments: {
      default: "gedeon",
      type: String,
    },

    bio: {
      type: String,
      default: "gedeon",
      validate: valid.paragraph("Biography", 5, 400),
    },

    profilePicture: {
      type: String,
      default: "https",
    },

    profileFillStatus: {
      type: Number,
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

lawyerSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

lawyerSchema.pre("save", function (next) {
  let percent = 25;
  const fields = [
    "firstName",
    "middleName",
    "lastName",
    "gender",
    "phone",
    "address",
    "nationality",
    "ID",
    "acquireLicense",
    "licenseNo",
    "levelOfEducation",
    "areaOfExpertise",
    "yearOfExperience",
    "preferenceArea",
    "yearOfExpire",
    "profilePicture",
    "resumeAndCoverLetter",
    "bio",
  ];
  fields.map((field) => {
    if (this[field]?.length > 0) {
      percent += 5;
    }
  });

  this.profileFillStatus = percent;
  next();
});

export const Lawyer = mongoose.model("lawyer", lawyerSchema);
