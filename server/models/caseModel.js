import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import * as valid from "../utils/validator.js";

const caseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "This case name is taken"],
      required: [true, "{PATH} '{VALUE}' is taken"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "please select a category"],
    },

    description: {
      type: String,
      validate: valid.paragraph("Description", 100, 1000),
      required: [true, "Description is required"],
    },

    caseManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "case-manager",
      required: [true, "Please select case manager"],
    },

    status: {
      type: String,
      default: "Pending",
    },

    year: {
      type: Number,
      default: new Date().getFullYear() * 1,
    },

    deleted: {
      type: Boolean,
      default: false,
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

caseSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

uniqueValidator.defaults.message = "{PATH} '{VALUE}' is taken";
caseSchema.plugin(uniqueValidator);
export const Case = mongoose.model("case", caseSchema);
