import mongoose from "mongoose";
// import uniqueValidator from "mongoose-unique-validator";
import * as valid from "../utils/validator.js";

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

    type: {
      type: String,
      enum: ["local", "global"],
      default: "local",
      validate: valid.required("Type"),
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

    latitude: {
      type: String,
    },

    longitude: {
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
      // default: "",
      validate: valid.required("Logo"),
      // data: Buffer,
      // contentTYpe:String,
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
      ref: "sales",
    },

    rating: {
      type: {
        total: { type: Number, default: 0 },
        average: { type: Number, default: 0 },
      },
    },

    currentBalance: { type: Number, default: 0 },

    saves: {
      total: { type: Number, default: 0 },
      available: { type: Number, default: 0 },
    },

    views: {
      total: { type: Number, default: 0 },
    },

    profileFillStatus: {
      type: Number,
    },

    // boost: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "boostHistory",
    // },

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

    // subscription: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "subscriptionHistory",
    // },

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
  next();
});

schema.pre("save", function (next) {
  let percent = 20;
  const fields = [
    "name",
    "type",
    "title",
    "phone",
    "video",
    "website",
    "description",
    "latitude",
    "longitude",
    "services",
    "features",
    "logo",
    "banner",
    "galleries",
    "socialMedias",
    "workingDays",
  ];
  fields.map((field) => {
    if (this[field]?.length > 0) {
      percent += 5;
    }
    return percent;
  });

  // console.log(percent, "percent");
  this.profileFillStatus = percent;
  next();
});

// uniqueValidator.defaults.message = "{PATH} '{VALUE}' is taken";
// schema.plugin(uniqueValidator);
export const Company = mongoose.model("company", schema);
