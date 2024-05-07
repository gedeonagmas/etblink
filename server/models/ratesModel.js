import mongoose from "mongoose";
import * as valid from "../utils/validator.js";
import { Company } from "./companyModel.js";

const rateSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      validate: valid.required("Full name"),
    },

    role: {
      type: String,
    },

    for: {
      type: String,
    },

    type: {
      type: String,
    },

    message: {
      type: String,
      validate: valid.required("Message"),
    },

    value: {
      type: Number,
      validate: valid.numberLower("Value", 1),
    },

    rater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        return this.role === "visitor"
          ? "visitor"
          : this.role === "company"
          ? "company"
          : this.role === "sales"
          ? "sales"
          : "admin";
      },
    },

    accepter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        return this.for === "company" ? "company" : "sales";
      },
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
rateSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

// rateSchema.pre(["findOneAndUpdate", "create"], async function (next) {
//   const company = await Rate.aggregate([
//     // { $unwind: "$_id" },
//     // {
//     //   $match: {
//     //     accepter: this.accepter,
//     //   },
//     // },

//     {
//       $group: {
//         _id: this.accepter,
//         total: {
//           $sum: 1,
//         },
//         average: { $avg: "$value" },
//       },
//     },

//     // { $addFields: { date: "2024-02" } },
//     // { $sort: { _id: 1 } },
//   ]);
//   // console.log(company, "company");
//   console.log(this, "this");
//   next();
// });

export const Rate = mongoose.model("rate", rateSchema);
