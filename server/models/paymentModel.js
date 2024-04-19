import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "application",
      required: [true, "please select case"],
    },

    rounds: {
      type: [Object],
    },

    customerApprovalStatus: {
      type: String,
      default: "pending",
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

paymentSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

export const Payment = mongoose.model("payment", paymentSchema);
