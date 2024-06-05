const mongoose = require("mongoose");
const valid = require("../utils/validator");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      validate: valid.required("Title"),
    },

    category: {
      type: String,
      validate: valid.required("Category"),
    },

    subTitle: {
      type: String,
      validate: valid.required("Sub title"),
    },

    description: {
      type: String,
      validate: valid.paragraph("Description", 20, 3000),
    },

    role: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userProfile",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userProfile",
    },

    visible: {
      type: Boolean,
      default: true,
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

jobSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Job = mongoose.model("job", jobSchema);
module.exports = { Job };
