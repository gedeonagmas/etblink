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

  banner: {
    type: [String],
    required: [true, "Banner is required"],
  },

  highlightServices: {
    type: [String],
    // validate: valid.paragraph("Highlight services", 4, 200),
  },

  secondPhone: {
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

  amenities: {
    //main features
    type: [String],
    // validate: valid.paragraph("Amenities", 100, 1000),
  },

  photoGallery: {
    type: [String],
    required: [true, "Photo galleries are required"],
  },

  video: {
    type: String,
  },

  website: {
    type: String,
  },

  socialMedia: {
    type: [Object],
    required: [true, "Social media link is required"],
  },

  workingDays: {
    type: [Object],
    required: [true, "Working days is required"],
  },

  registeredBy: {
    type: String,
    default: "Self",
  },

  sales: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  priceRange: {
    type: [Object],
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
