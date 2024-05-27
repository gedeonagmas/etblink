const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },

    amount: {
      type: Number,
      default: 0,
    },

    payFrom: {
      type: String,
    },

    bankDetail: {
      type: Object,
    },

    checkDetail: {
      type: Object,
    },

    approved: {
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

paymentSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Payment = mongoose.model("payment", paymentSchema);
module.exports = { Payment };
