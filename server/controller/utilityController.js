import asyncCatch from "express-async-catch";
import { Company } from "../models/companyModel.js";
import { Rate } from "../models/ratesModel.js";
import { Save } from "../models/saveModel.js";
import { View } from "../models/viewModel.js";
import AppError from "../utils/AppError.js";
import { User } from "../models/userModel.js";
import { Sales } from "../models/salesModel.js";
import { Visitor } from "../models/visitorModel.js";
import { BoostHistory } from "../models/boostHistoryModel.js";
import { SubscriptionHistory } from "../models/subscriptionHistoryModel.js";
import { Payment } from "../models/paymentModel.js";

export const createRate = asyncCatch(async (req, res, next) => {
  const rateHandler = async () => {
    const rate = await Rate.aggregate([
      {
        $group: {
          _id: {
            accepter: "$accepter",
            type: "$type",
          },

          total: {
            $sum: 1,
          },
          average: { $avg: "$value" },
        },
      },
    ]);

    const company =
      req.body.type === "company"
        ? await Company.findById(req.body.accepter)
        : await Sales.findById(req.body.accepter);

    const result = rate?.filter(
      (e) => e?._id?.accepter?.toString() === req.body.accepter
    );

    company.rating.total = result[0]?.total;
    company.rating.average = result[0]?.average?.toFixed(1);

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
    .populate("rater accepter")
    .limit(20)
    .sort("-createdAt");
  res.status(200).json({
    status: "Read",
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

export const deleteSave = asyncCatch(async (req, res, next) => {
  // console.log(req.body);
  const remove = await Save.findOneAndDelete({
    company: req.body.company,
    saver: req.body.saver,
  });

  // console.log((remove, "remove"));
  if (remove) {
    const company = await Company.findById(req.body.company);
    company.saves.available = company.saves.available - 1;
    await company.save();
    return res.status(200).json({
      status: "Created",
      message: "Company removed from your list.",
    });
  } else {
    return next(
      new AppError("something went wrong unable to remove the company!")
    );
  }
});

export const createView = asyncCatch(async (req, res, next) => {
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

export const upgradeHandler = asyncCatch(async (req, res, next) => {
  const sales =
    req.body.role === "sales" && (await Visitor.findById(req.body.user));

  const account =
    req.body.role === "company"
      ? await Company.create({})
      : await Sales.create({
          firstName: sales.firstName ? sales.firstName : undefined,
          middleName: sales.middleName ? sales.middleName : undefined,
          lastName: sales.lastName ? sales.lastName : undefined,
          bio: sales.bio ? sales.bio : undefined,
          gender: sales.gender ? sales.gender : undefined,
          phone: sales.phone ? sales.phone : undefined,
          address: sales.address ? sales.address : undefined,
          profilePicture: sales.profilePicture
            ? sales.profilePicture
            : undefined,
          profileFillStatus: sales.profileFillStatus
            ? sales.profileFillStatus
            : undefined,
        });

  if (account._id) {
    await User.findByIdAndUpdate(
      { _id: req.body._id },
      {
        $set: { user: account._id, role: req.body.role },
      }
    );

    await Save.updateMany(
      { saver: req.body.user },
      { $set: { saver: account._id, role: req.body.role } }
    );

    await View.updateMany(
      { viewer: req.body.user },
      { $set: { viewer: account._id, role: req.body.role } }
    );

    await Rate.updateMany(
      { rater: req.body.user },
      { $set: { rater: account._id, role: req.body.role } }
    );

    return res.status(200).json({
      status: "Created",
      message: "Account upgraded successfully Please Login Again to Continue.",
    });
  } else {
    return next(
      new AppError("something went wrong unable to upgrade your account!")
    );
  }
});

export const boostHandler = asyncCatch(async (req, res, next) => {
  // console.log(req.body);
  const company = await Company.findById(req.body.company);
  if (req.body.type === "boost") {
    if (req.body.paymentMethod === "deposit") {
      company.currentBalance = company.currentBalance * 1 - req.body.amount * 1;
    }
    company.isBoosted = true;
    company.boostEndDate = Date.parse(new Date(req.body.endDate));
    company.boostStartDate = Date.parse(new Date(req.body.startDate));
    company.boostStatus = "Payed";
    await company.save();

    const boost = await BoostHistory.create({
      company: req.body.company,
      boost: req.body.boost,
      startDate: Date.parse(new Date(req.body.startDate)),
      endDate: Date.parse(new Date(req.body.endDate)),
      paymentMethod: req.body.paymentMethod,
    });
  } else if (req.body.type === "subscription") {
    if (req.body.paymentMethod === "deposit") {
      company.currentBalance = company.currentBalance * 1 - req.body.amount * 1;
    }
    company.isSubscribed = true;
    company.subscriptionEndDate = Date.parse(new Date(req.body.endDate));
    company.subscriptionStartDate = Date.parse(new Date(req.body.startDate));
    company.subscriptionStatus = "Payed";
    await company.save();

    const subscription = await SubscriptionHistory.create({
      company: req.body.company,
      subscription: req.body.boost,
      startDate: Date.parse(new Date(req.body.startDate)),
      endDate: Date.parse(new Date(req.body.endDate)),
      paymentMethod: req.body.paymentMethod,
    });
  } else if (req.body.type === "fund") {
    company.currentBalance = company.currentBalance * 1 + req.body.amount * 1;
    await company.save();

    const fund = await Payment.create({
      company: req.body.company,
      amount: req.body.amount,
      status: "Payed",
      paymentMethod: req.body.paymentMethod,
    });
  }
  // else if (req.body.type === "deposit") {
  //   company.currentBalance = company.currentBalance * 1 - req.body.amount * 1;
  //   await company.save();

  //   const boost = await BoostHistory.create({
  //     company: req.body.company,
  //     boost: req.body.boost,
  //     startDate: Date.parse(new Date(req.body.startDate)),
  //     endDate: Date.parse(new Date(req.body.endDate)),
  //     paymentMethod: req.body.paymentMethod,
  //   });
  // }

  // await company.save();
  // const boost = await BoostHistory.create({
  //   company: req.body.company,
  //   boost: req.body.boost,
  //   startDate: Date.parse(new Date(req.body.startDate)),
  //   endDate: Date.parse(new Date(req.body.endDate)),
  //   paymentMethod: req.body.paymentMethod,
  // });

  // if (boost) {
  return res.status(200).json({
    status: "Payed",
    message: `Your company is ${req.body.type + "ed"} Successfully. Thank you!`,
  });
  // } else {
  //   return next(
  //     new AppError("something went wrong unable to upgrade your account!")
  //   );
  // }
  // console.log(Date.parse(new Date(req.body.endDate)));
  // const ISO = new Date().toISOString(); //'2024-04-21T01:57:29.465Z' ==> first get the current time in ISO format
  // const startDate = Date.parse("2024-05-21T01:57:29.465Z"); // 1716256649465 ==> this will be the start date
  // const endDate = Date.parse("2024-06-21T01:57:29.465Z"); //   1718935049465 ==> you just edit the year, month and
  // date based on the predefined boost data from the front end

  //when the company want to boost the system must check the following conditions.
  // 1. check if the company subscription plan must be greater than boost endDate
  // 2. check if there is less than 6 companies in boosting list. if the company is exceed to 6 allow company to
  //  boost after 1 of the companies end data this company startDate must be > one of the nearest companies endDate.
  // 3.
});
