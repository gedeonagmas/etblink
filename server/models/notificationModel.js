const mongoose = require("mongoose");
const valid = require("../utils/validator");

const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      validate: valid.required("Message"),
    },
    role: {
      type: String,
    },
    receiver: {
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
    isViewed: {
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

notificationSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Notification = mongoose.model("notification", notificationSchema);
module.exports = { Notification };
