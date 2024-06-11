const mongoose = require("mongoose");
const valid = require("../utils/validator");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      validate: valid.paragraph("Name", 4, 100),
      // index: {
      //   unique: true,
      //   partialFilterExpression: { name: { $type: "string" } },

      // },
      // default: null,
    },

    category: {
      type: String,
      validate: valid.required("Category"),
    },

    subCategory: {
      type: String,
    },

    categoryImage: {
      type: String,
    },

    type: {
      type: String,
      enum: ["local", "global"],
      default: "local",
      validate: valid.required("Type"),
    },

    city: {
      type: String,
    },

    country: {
      type: String,
    },

    title: {
      type: String,
      validate: valid.paragraph("Title", 4, 200),
    },

    address: {
      type: String,
      validate: valid.paragraph("Address", 4, 200),
    },

    phone: {
      type: String,
      validate: valid.phone("Phone"),
    },

    video: {
      type: String,
    },

    website: {
      type: String,
    },

    description: {
      type: String,
      validate: valid.paragraph("description", 100, 10000),
    },

    maps: {
      type: String,
    },

    services: {
      type: [
        {
          type: String,
          validate: valid.required("Services"),
        },
      ],
    },

    features: {
      type: [
        {
          type: String,
          validate: valid.required("Features"),
        },
      ],
    },

    logo: {
      type: String,
      validate: valid.required("Logo"),
    },

    banner: {
      type: String,
      validate: valid.required("Banner"),
    },

    galleries: {
      type: [
        {
          type: String,
          validate: valid.required("Gallery"),
        },
      ],
    },

    socialMedias: {
      type: Object,
      validate: valid.required("Social medias"),
    },

    workingDays: {
      type: Object,
      validate: valid.required("Working days"),
    },

    registeredBy: {
      type: String,
      default: "Self",
    },

    sales: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userProfile",
    },

    rating: {
      total: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
    },

    currentBalance: { type: Number, default: 0 },

    saves: {
      total: { type: Number, default: 0 },
      available: { type: Number, default: 0 },
    },

    views: {
      total: { type: Number, default: 0 },
    },

    profileFill: {
      type: Number,
      default: 16,
    },

    boostStartDate: {
      type: Number,
      default: 0,
    },

    boostEndDate: {
      type: Number,
      default: 0,
    },

    isBoosted: {
      type: Boolean,
      default: false,
    },

    boostStatus: {
      type: String,
      default: "",
    },

    subscriptionStartDate: {
      type: Number,
      default: 0,
    },

    subscriptionEndDate: {
      type: Number,
      default: 0,
    },

    isSubscribed: {
      type: Boolean,
      default: false,
    },

    subscriptionStatus: {
      type: String,
      default: "",
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

schema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  let percent = 16;
  const fields = [
    "name",
    "type",
    "title",
    "phone",
    "address",
    "video",
    "website",
    "description",
    "services",
    "maps",
    "features",
    "logo",
    "banner",
    "galleries",
    "socialMedias",
    "workingDays",
  ];

  fields.map((field) => {
    if (this._update[field]?.length > 0) {
      percent =
        this._update[field] === "website" ||
        this._update[field] === "video" ||
        this._update[field] === "maps" ||
        this._update[field] === "title"
          ? percent + 3
          : percent + 6;
    }
  });

  this._update.profileFill = percent;
  next();
});

// schema.pre("save", function (next) {
//   let percent = 20;
//   const fields = [
//     "name",
//     "type",
//     "title",
//     "phone",
//     "video",
//     "website",
//     "description",
//     "latitude",
//     "longitude",
//     "services",
//     "features",
//     "logo",
//     "banner",
//     "galleries",
//     "socialMedias",
//     "workingDays",
//   ];
//   fields.map((field) => {
//     if (this[field]?.length > 0) {
//       percent += 5;
//     }
//     return percent;
//   });

//   // console.log(percent, "percent");
//   this.profileFillStatus = percent;
//   next();
// });

// uniqueValidator.defaults.message = "{PATH} '{VALUE}' is taken";
// schema.plugin(uniqueValidator);
const Company = mongoose.model("company", schema);
module.exports = { Company };
