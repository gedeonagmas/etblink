const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    groupName: { type: String },
    admin: { type: String },
    members: { type: [String] },
    requests: { type: [String] },
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

const Group = mongoose.model("group", groupSchema);
module.exports = { Group };
