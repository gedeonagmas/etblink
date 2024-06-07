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

    // type: {
    //   type: String,
    // },

    address: {
      type: String,
      validate: valid.paragraph("Address", 4, 200),
    },

    earn: {
      total: { type: Number },
      withdraw: { type: Number },
      current: { type: Number },
    },

    rating: {
      total: { type: Number },
      average: { type: Number },
    },

    profilePicture: {
      type: String,
      default: "",
    },

    profileFill: {
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
  let percent = 20;
  const fields = [
    "firstName",
    "middleName",
    "lastName",
    "gender",
    "phone",
    "bio",
    "address",
    "profilePicture",
  ];

  fields.map((field) => {
    if (this._update[field]?.length > 0) {
      percent += 10;
    }
  });

  this._update.profileFill = percent;
  next();
});

const UserProfile = mongoose.model("userProfile", profileSchema);
module.exports = { UserProfile };
