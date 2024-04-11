import asyncCatch from "express-async-catch";
import { Company } from "../models/companyModel.js";
import { Rate } from "../models/ratesModel.js";

export const createRate = asyncCatch(async (req, res, next) => {
  // let message = "your rate is created successfully";

  const data = await Rate.find({
    rater: req.body.rater,
    accepter: req.body.accepter,
  });

  if (data.length > 0) {
    await Rate.findOneAndUpdate({ _id: data[0]._id }, { ...req.body });
    return res
      .status(200)
      .json({ status: "Created", message: "rating is just updated" });
  } else {
    await Rate.create(req.body);
    return res
      .status(200)
      .json({ status: "Created", message: "rating is added successfully" });
  }

  // const d = await Rate.find({
  //   accepter: req.body.accepter,
  //   rater: req.body.rater,
  // });

  // let sum = 0;
  // d.map((e) => {
  //   sum = sum + e.value;
  //   return sum;
  // });

  // const accepter =
  //   req.body.type === "company"
  //     ? await Company.findOne({ _id: req.body.accepter })
  //     : null;
  // console.log(req.body.accepter, req.body.type, "dd");
  // accepter.rating = (sum / d.length).toFixed(1);

  // await accepter.save();
  // res.status(200).json({ status: "Created", message });
});

export const readRate = asyncCatch(async (req, res, next) => {
  const data = await Rate.find({ accepter: req.query.id }).sort("-createdAt");
  res.status(200).json({
    status: "Read",
    message: "rating added successfully",
    data,
  });
});

export const readMultipleRate = asyncCatch(async (req, res, next) => {
  const data = await Rate.find().sort("-createdAt");
  res.status(200).json({
    status: "Read",
    data,
  });
});

export const deleteRate = asyncCatch(async (req, res, next) => {
  const data = await Rate.findByIdAndDelete(req.query.id);
  res.status(200).json({
    status: "Deleted",
    message: "rate deleted successfully",
    data,
  });
});
