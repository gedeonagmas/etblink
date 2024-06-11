const mongoose = require("mongoose");
const valid = require("../utils/validator");

const commissionSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      default: 0,
      validate: valid.numberLower("Commission value", 0),
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

commissionSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Commission = mongoose.model("commission", commissionSchema);
module.exports = { Commission };
