const mongoose = require("mongoose");
const valid = require("../utils/validator");

const youtubeSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      validate: valid.required("Video Id"),
    },
    title: {
      type: String,
      validate: valid.required("Title"),
    },
    subtitle: {
      type: String,
      validate: valid.required("Subtitle"),
    },
    date: {
      type: String,
      default: Date.now(),
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

youtubeSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Youtube = mongoose.model("youtube", youtubeSchema);
module.exports = { Youtube };
