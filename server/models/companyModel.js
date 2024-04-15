import mongoose from "mongoose";
// import uniqueValidator from "mongoose-unique-validator";
import * as valid from "../utils/validator.js";

const schema = new mongoose.Schema({
  name: {
    type: String,
    validate: valid.paragraph("Name", 4, 100),
    // index: {
    //   unique: true,
    //   partialFilterExpression: { name: { $type: "string" } },

    // },
    // default: null,
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
    validate: valid.paragraph("description", 100, 1000),
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
    ref: "user",
  },

  rating: {
    type: {
      total: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
    },
  },

  isBoosted: {
    type: Boolean,
    default: false,
  },

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
});

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
