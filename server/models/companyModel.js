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
    enum: ["Local", "Global"],
    default: "Local",
    // validate: valid.required("Type"),
  },

  title: {
    type: String,
    validate: valid.paragraph("Title", 4, 200),
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
    type: [{ type: String, validate: valid.required("Services") }],
    // validate: valid.required(""),
  },

  features: {
    type: [{ type: String, validate: valid.required("Features") }],
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
    type: [{ type: String, validate: valid.required("Galleries") }],
    // validate: valid.required(""),
  },

  socialMedias: {
    type: {
      type: {
        type: Object,
        validate: valid.required("Social medias"),
      },
    },
  },

  workingDays: {
    type: Object,
    validate: valid.required("Working days"),
  },

  pricingRange: {
    type: Object,
  },

  registeredBy: {
    type: String,
    default: "Self",
  },

  sales: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
  let percent = 15;
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
    "pricingRange",
  ];
  fields.map((field) => {
    if (this[field]?.length > 0) {
      percent += 5;
    }
  });

  this.profileFillStatus = percent;
  next();
});

// uniqueValidator.defaults.message = "{PATH} '{VALUE}' is taken";
// schema.plugin(uniqueValidator);
export const Company = mongoose.model("company", schema);
