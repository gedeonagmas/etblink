const mongoose = require("mongoose");
const valid = require("../utils/validator");

const profileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      validate: valid.name("First name"),
    },

    middleName: {
      type: String,
      validate: valid.name("Middle name"),
    },

    lastName: {
      type: String,
      validate: valid.name("Last name"),
    },

    bio: {
      type: String,
      validate: valid.textMax("Bio", 100),
    },

    gender: {
      type: String,
      validate: valid.gender("Gender"),
    },

    phone: {
      type: String,
      validate: valid.phone("Phone"),
    },

    type: {
      type: String,
      validate: valid.phone("Type"),
    },

    address: {
      type: String,
      validate: valid.paragraph("Address", 4, 200),
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

    profilePicture: {
      type: String,
      default: "",
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

profileSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

profileSchema.pre("save", function (next) {
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

const UserProfile = mongoose.model("userProfile", profileSchema);
module.exports = { UserProfile };
