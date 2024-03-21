import mongoose from "mongoose";

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

export const Group = mongoose.model("group", groupSchema);
