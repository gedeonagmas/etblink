import mongoose from "mongoose";
import * as valid from "../utils/validator.js";

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
    sender: {
      type: String,
      validate: valid.required("Sender"),
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

export const Notification = mongoose.model("notification", notificationSchema);
