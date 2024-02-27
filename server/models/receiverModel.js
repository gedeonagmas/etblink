import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import * as valid from "../utils/validator.js";

const schema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
  },

  name: {
    type: String,
    unique: true,
    validate: valid.paragraph("Name", 4, 200),
  },

  type: {
    enum: ["Local", "Global"],
    required: [true, "type must be either Local or Global"],
  },

  banner: {
    type: [String],
    required: [true, "Banner is required"],
  },

  highlightServices: {
    type: [String],
    unique: true,
    validate: valid.paragraph("Highlight services", 4, 200),
  },

  phone: {
    type: String,
    validate: valid.phone("Phone"),
    required: [true, "Phone is required"],
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
    validate: valid.paragraph("Amenities", 100, 1000),
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
});

schema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

uniqueValidator.defaults.message = "{PATH} '{VALUE}' is taken";
schema.plugin(uniqueValidator);
export const Receiver = mongoose.model("receiver", schema);
