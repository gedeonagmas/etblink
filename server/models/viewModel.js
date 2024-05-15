const mongoose = require("mongoose");
const valid = require("../utils/validator");
const { Company } = require("./companyModel");

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

const View = mongoose.model("view", viewSchema);
module.exports = { View };
