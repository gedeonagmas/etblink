import asyncCatch from "express-async-catch";
import { Company } from "../models/companyModel.js";
import { Rate } from "../models/ratesModel.js";
import { Save } from "../models/saveModel.js";
import { View } from "../models/viewModel.js";

export const createRate = asyncCatch(async (req, res, next) => {
  const rateHandler = async () => {
    const rate = await Rate.aggregate([
      {
        $group: {
          _id: req.body.accepter,
          total: {
            $sum: 1,
          },
          average: { $avg: "$value" },
        },
      },
    ]);

    const company = await Company.findById(req.body.accepter);

    company.rating.total = rate[0]?.total;
    company.rating.average = rate[0]?.average.toFixed(1);

    await company.save();
  };

  const data = await Rate.find({
    rater: req.body.rater,
    accepter: req.body.accepter,
  });

  if (data.length > 0) {
    await Rate.findOneAndUpdate({ _id: data[0]._id }, { ...req.body });
    rateHandler();
    return res
      .status(200)
      .json({ status: "Created", message: "rating is just updated" });
  } else {
    await Rate.create(req.body);
    rateHandler();
    return res
      .status(200)
      .json({ status: "Created", message: "rating is added successfully" });
  }
});

export const readRate = asyncCatch(async (req, res, next) => {
  const data = await Rate.find({ accepter: req.query.id })
    .populate("rater")
    .sort("-createdAt");
  // console.log(req.query, "rate");
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

export const createSave = asyncCatch(async (req, res, next) => {
  const saves = await Save.find({
    company: req.body.company,
    saver: req.body.saver,
  });
  if (saves?.length > 0) {
    return res
      .status(200)
      .json({ message: "Company is already in your list." });
  }
  await Save.create(req.body);

  const company = await Company.findById(req.body.company);
  company.saves.total = company.saves.total + 1;
  company.saves.available = company.saves.available + 1;
  await company.save();

  res.status(200).json({
    status: "Created",
    message: "company added to your list.",
  });
});

export const createView = asyncCatch(async (req, res, next) => {
  console.log(req.body);
  const views = await View.find({
    company: req.body.company,
    viewer: req.body.viewer,
  });
  if (views?.length > 0) {
    return res
      .status(200)
      .json({ message: "Company is already in your list." });
  }
  await View.create(req.body);

  const company = await Company.findById(req.body.company);
  company.views.total = company.views.total + 1;
  company.views.available = company.views.available + 1;
  await company.save();

  res.status(200).json({
    status: "Created",
    message: "company added to your list.",
  });
});
