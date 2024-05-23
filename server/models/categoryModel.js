const mongoose = require("mongoose");
const valid = require("../utils/validator");

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      validate: valid.required("Category"),
    },

    subCategory: {
      type: [String],
      //   validate: valid.numberLower("Amount", 0),
    },

    type: {
      type: String,
      enum: ["local", "global"],
      default: "local",
      validate: valid.required("Type"),
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

categorySchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Category = mongoose.model("category", categorySchema);
module.exports = { Category };
