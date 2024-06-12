const mongoose = require("mongoose");
const valid = require("../utils/validator");
const { Company } = require("./companyModel");

const saveSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },

    role: {
      type: String,
    },

    saver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        return this.role === "company" ? "company" : "userProfile";
      },
    },

    date: {
      type: Number,
      default: Date.parse(new Date().toISOString().split("T")[0]),
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

saveSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Save = mongoose.model("save", saveSchema);
module.exports = { Save };
