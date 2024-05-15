const mongoose = require("mongoose");
const valid = require("../utils/validator");

const salesSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "",
      validate: valid.name("First name"),
    },

    middleName: {
      type: String,
      default: "",
      validate: valid.name("Middle name"),
    },

    lastName: {
      type: String,
      default: "",
      validate: valid.name("Last name"),
    },

    bio: {
      type: String,
      default: "",
      validate: valid.textMax("Bio", 100),
    },

    gender: {
      type: String,
      default: "",
      validate: valid.gender("Gender"),
    },

    phone: {
      type: String,
      default: "",
      validate: valid.phone("Phone"),
    },

    address: {
      type: String,
      default: "",
      validate: valid.paragraph("Address", 4, 200),
    },

    profilePicture: {
      type: String,
      default: "",
    },

    earn: {
      total: { type: Number, default: 0 },
      withdraw: { type: Number, default: 0 },
      current: { type: Number, default: 0 },
    },

    rating: {
      type: {
        total: { type: Number, default: 0 },
        average: { type: Number, default: 0 },
      },
    },

    profileFillStatus: {
      type: Number,
      default: 20,
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

salesSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

salesSchema.pre("save", function (next) {
  let percent = 20;
  const fields = [
    "firstName",
    "middleName",
    "lastName",
    "gender",
    "phone",
    "address",
    "profilePicture",
  ];
  fields.map((field) => {
    if (this[field]?.length > 0) {
      percent += 10;
    }
  });

  // console.log(this, percent, "percent");
  this.profileFillStatus = percent;
  next();
});

const Sales = mongoose.model("sales", salesSchema);
module.exports = { Sales };
