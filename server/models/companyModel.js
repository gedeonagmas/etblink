import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import * as valid from "../utils/validator.js";

const schema = new mongoose.Schema({
  name: {
    type: String,
    validate: valid.paragraph("Name", 4, 200),
    // index: {
    //   unique: true,
    //   partialFilterExpression: { name: { $type: "string" } },

    // },
    // default: null,
  },

  type: {
    enum: ["Local", "Global"],
    // required: [true, "type must be either Local or Global"],
  },

  title: {
    type: String,
    validate: valid.paragraph("Title", 4, 200),
  },

  phone: {
    type: String,
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
    validate: valid.paragraph("latitude", 100, 1000),
  },

  longitude: {
    type: String,
    validate: valid.paragraph("latitude", 100, 1000),
  },

  highlightServices: {
    type: [String],
    // validate: valid.paragraph("Highlight services", 4, 200),
  },

  mainFeatures: {
    //main features
    type: [String],
    // validate: valid.paragraph("Amenities", 100, 1000),
  },

  logo: {
    type: String,
    required: [true, "Logo is required"],
  },

  banner: {
    type: String,
    required: [true, "Banner is required"],
  },

  photoGallery: {
    type: [String],
    required: [true, "Photo galleries are required"],
  },

  socialMedia: {
    type: Object,
    required: [true, "Social media link is required"],
  },

  workingDays: {
    type: Object,
    required: [true, "Working days is required"],
  },

  priceRange: {
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
    "banner",
    "highlightServices",
    "secondPhone",
    "description",
    "latitude",
    "longitude",
    "amenities",
    "photoGallery",
    "video",
    "website",
    "socialMedia",
    "workingDays",
    "sales",
    "priceRange",
  ];
  fields.map((field) => {
    if (this[field]?.length > 0) {
      percent += 5;
    }
  });

  this.profileFillStatus = percent;
  next();
});

uniqueValidator.defaults.message = "{PATH} '{VALUE}' is taken";
schema.plugin(uniqueValidator);
export const Company = mongoose.model("company", schema);
