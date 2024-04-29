import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },

    amount: {
      type: Number,
      default: 0,
    },

    paymentMethod: {
      type: String,
    },

    status: {
      type: String,
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
