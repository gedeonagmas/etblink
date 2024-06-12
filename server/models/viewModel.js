const mongoose = require("mongoose");

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

viewSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const View = mongoose.model("view", viewSchema);
module.exports = { View };
