const asyncCatch = require("express-async-catch");
const { Company } = require("../models/companyModel");
const { Rate } = require("../models/ratesModel");
const { Save } = require("../models/saveModel");
const { View } = require("../models/viewModel");
const AppError = require("../utils/AppError");
const { User } = require("../models/userModel");
const { Sales } = require("../models/salesModel");
const { Visitor } = require("../models/visitorModel");
const { BoostHistory } = require("../models/boostHistoryModel");
const { SubscriptionHistory } = require("../models/subscriptionHistoryModel");
const { Payment } = require("../models/paymentModel");
const { sendEmailHandler } = require("./emailController");
const { Notification } = require("../models/notificationModel");
const from = "billing@etblink.com";

const notificationSender = async (message, role, receiver) => {
  return await Notification.create({
    message,
    role,
    receiver,
  });
};

const emailSender = async (subject, message, e) => {
  const from = "billing@etblink.com";
  notificationSender(message, e?.role, e?.user?._id);
  return sendEmailHandler({ subject, message, to: e?.email, from });
};

const createRate = asyncCatch(async (req, res, next) => {
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

    const user = await User.find({ user: req.body.accepter });
    const subject = `Your Rate is Updated.`;
    const message = `Your Rate is Updated.`;
    return sendEmailHandler({ subject, message, to: user[0]?.email, from });
  };

  const data = await Rate.find({
    rater: req.body.rater,
    accepter: req.body.accepter,
  });

  if (data.length > 0) {
    await Rate.findOneAndUpdate({ _id: data[0]._id }, { ...req.body });
    rateHandler("update");
    return res
      .status(200)
      .json({ status: "Created", message: "rating is just updated" });
  } else {
    await Rate.create(req.body);
    rateHandler("create");
    return res
      .status(200)
      .json({ status: "Created", message: "rating is added successfully" });
  }
});

const readRate = asyncCatch(async (req, res, next) => {
  const data = await Rate.find({ accepter: req.query.id })
    .populate("rater accepter")
    .limit(20)
    .sort("-createdAt");
  res.status(200).json({
    status: "Read",
    data,
  });
});

const notificationView = asyncCatch(async (req, res, next) => {
  const data = await Notification.find({
    receiver: req.body.receiver,
    isViewed: false,
  });

  data.map(async (note) => {
    await Notification.findByIdAndUpdate(note._id, { isViewed: true });
  });

  await data.save();
  res.status(200).json({
    status: "Read",
    data,
  });
});

const readMultipleRate = asyncCatch(async (req, res, next) => {
  const data = await Rate.find().sort("-createdAt");
  res.status(200).json({
    status: "Read",
    data,
  });
});

const deleteRate = asyncCatch(async (req, res, next) => {
  const data = await Rate.findByIdAndDelete(req.query.id);
  res.status(200).json({
    status: "Deleted",
    message: "rate deleted successfully",
    data,
  });
});

const createSave = asyncCatch(async (req, res, next) => {
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

  const user = await User.find({ user: req.body.company });
  const subject = `Your company is added to save list.`;
  const message = `Your company is added to save list.`;
  sendEmailHandler({ subject, message, to: user[0]?.email, from });

  return res.status(200).json({
    status: "Created",
    message: "company added to your list.",
  });
});

const deleteSave = asyncCatch(async (req, res, next) => {
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

const createView = asyncCatch(async (req, res, next) => {
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

  const user = await User.find({ user: req.body.company });
  const subject = `Your company is viewed.`;
  const message = `Your company is viewed by a new client.`;
  const html = `<div>Your company is viewed by a new client. click here <a style={{background:'yellow',padding:'5px', border-radius:'20px',color:white,padding:10px;}} href=${
    "https://etblink.com/dashboard/" + user[0]?.role + "/views"
  }>here</a> for more detail.</div>`;
  sendEmailHandler({ subject, to: user[0]?.email, from, html });

  return res.status(200).json({
    status: "Created",
    message: "company added to your list.",
  });
});

const upgradeHandler = asyncCatch(async (req, res, next) => {
  const sales =
    req.body.role === "sales" && (await Visitor.findById(req.body.user));

  console.log(sales);
  const account =
    req.body.role === "company"
      ? await Company.create({})
      : await Sales.create(
          {
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
          },
          { validateBeforeSave: false }
        );

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

const paymentHandler = asyncCatch(async (req, res, next) => {
  const {
    serviceType,
    payFrom,
    endDate,
    startDate,
    amount,
    boost,
    subscription,
    approvalType,
    actionType,
  } = req.body;

  const company = await Company.findById(req.body.company);

  if (serviceType === "boosting") {
    company.isBoosted =
      payFrom === "online" || payFrom === "deposit" ? true : false;

    company.boostEndDate = Date.parse(new Date(endDate));
    company.boostStartDate = Date.parse(new Date(startDate));

    company.boostStatus =
      payFrom === "online" || payFrom === "deposit" ? "Payed" : "Pending";

    payFrom === "deposit" &&
      (company.currentBalance = company.currentBalance * 1 - amount * 1);

    await company.save();

    const response = await BoostHistory.create({
      company: req.body.company,
      boost,
      startDate: Date.parse(new Date(startDate)),
      endDate: Date.parse(new Date(endDate)),
      payFrom,
      approved: payFrom === "online" || payFrom === "deposit" ? true : false,
      bankDetail: payFrom === "bank" ? req.body.bankDetail : undefined,
      checkDetail: payFrom === "check" ? req.body.checkDetail : undefined,
    });

    if (response) {
      const subject = "New boosted plan is added to your company.";
      const message = `new boosted plan is added to your company and your boosting service is released from ${new Date(
        history.startDate
      ).toDateString()} to ${new Date(
        history.endDate
      ).toDateString()}. thank you for working with us!!!`;

      emailSender(subject, message, e);
    }
  } else if (serviceType === "serviceFee") {
    console.log(req.body.company, "comapny");
    company.isSubscribed =
      payFrom === "online" || payFrom === "deposit" ? true : false;

    company.subscriptionEndDate = Date.parse(new Date(endDate));
    company.subscriptionStartDate = Date.parse(new Date(startDate));

    company.subscriptionStatus =
      payFrom === "online" || payFrom === "deposit" ? "Payed" : "Pending";

    payFrom === "deposit" &&
      (company.currentBalance = company.currentBalance * 1 - amount * 1);

    await company.save();

    await SubscriptionHistory.create({
      company: req.body.company,
      subscription,
      startDate: Date.parse(new Date(startDate)),
      endDate: Date.parse(new Date(endDate)),
      payFrom,
      approved: payFrom === "online" || payFrom === "deposit" ? true : false,
      bankDetail: payFrom === "bank" ? req.body.bankDetail : undefined,
      checkDetail: payFrom === "check" ? req.body.checkDetail : undefined,
    });

    // const subject = "Your Transaction is Successful thank you.";
    // const message = `Your Transaction is Successful thank you.`;
    // return sendEmailHandler(subject, message, company?.email, from);
  } else if (serviceType === "fund") {
    await Payment.create({
      company: req.body.company,
      amount: amount,
      payFrom: payFrom,
      bankDetail: payFrom === "bank" ? req.body.bankDetail : undefined,
      checkDetail: payFrom === "check" ? req.body.checkDetail : undefined,
    });

    // const subject = "Your Transaction is Successful thank you.";
    // const message = `Your Transaction is Successful thank you.`;
    // return sendEmailHandler(subject, message, company?.email, from);
  } else if (serviceType === "approve") {
    if (req.user.role !== "admin")
      return next(
        new AppError("You are not authorized to perform this action!")
      );

    const approveHandler = async (model) => {
      if (approvalType === "fund") {
        company.currentBalance =
          req.body.value === true
            ? company.currentBalance * 1 - req.body.amount * 1
            : company.currentBalance * 1 + req.body.amount * 1;
        await company.save();
      }

      return await model.findByIdAndUpdate(req.body.id, {
        approved: req.body.value,
      });
    };

    const startHandler = async (model, type) => {
      const history = await model.findById(req.body.id);

      if (history) {
        const company = await User.find({ user: history?.company }).populate(
          "user"
        );

        if (type === "boost") {
          company[0].user.boostStartDate = history.startDate;
          company[0].user.boostEndDate = history.endDate;
          company[0].user.isBoosted = req.body.value;
          company[0].user.boostStatus = req.body.value ? "Started" : "Pending";
        }

        if (type === "subscribe") {
          company[0].user.subscriptionStartDate = history.startDate;
          company[0].user.subscriptionEndDate = history.endDate;
          company[0].user.isSubscribed = req.body.value;
          company[0].user.subscriptionStatus = req.body.value
            ? "Started"
            : "Pending";
        }

        const response = await company[0].user.save();
        if (response) {
          const subject = `New ${
            type === "boost" ? "boost" : "service"
          } plan is added to your company.`;
          const message = `new ${
            type === "boost" ? "boost" : "service"
          } plan is added to your company and your service is released from ${new Date(
            history.startDate
          ).toDateString()} to ${new Date(
            history.endDate
          ).toDateString()}. thank you for working with us!!!`;

          emailSender(subject, message, company[0]);
        }
      }
    };

    approvalType === "boosting" && approveHandler(BoostHistory);
    approvalType === "subscription" && approveHandler(SubscriptionHistory);
    approvalType === "fund" && approveHandler(Payment);

    actionType === "boosting" && startHandler(BoostHistory, "boost");
    actionType === "subscription" &&
      startHandler(SubscriptionHistory, "subscribe");

    //######### send email and local notifications ###############
    // const subject = "Your Transaction is Successful thank you.";
    // const message = `Your Transaction is Successful thank you.`;
    // notificationSender(message, "company", company?._id);
    // return sendEmailHandler(subject, message, company?.email, from);
  }

  return res.status(200).json({
    status: "Payed",
    message: `Transaction Successful Thank you!`,
  });
});

const companyAggregation = asyncCatch(async (req, res, next) => {
  const categories = await Company.aggregate([
    {
      $group: {
        _id: "$category",
        total: {
          $sum: 1,
        },
      },
    },
  ]);

  return res.status(200).json({
    status: "Read",
    data: categories,
  });
});

module.exports = {
  createRate,
  readRate,
  readMultipleRate,
  deleteRate,
  createSave,
  deleteSave,
  createView,
  upgradeHandler,
  paymentHandler,
  companyAggregation,
  notificationSender,
  notificationView,
};

//   // console.log(Date.parse(new Date(req.body.endDate)));
//   // const ISO = new Date().toISOString(); //'2024-04-21T01:57:29.465Z' ==> first get the current time in ISO format
//   // const startDate = Date.parse("2024-05-21T01:57:29.465Z"); // 1716256649465 ==> this will be the start date
//   // const endDate = Date.parse("2024-06-21T01:57:29.465Z"); //   1718935049465 ==> you just edit the year, month and
//   // date based on the predefined boost data from the front end

//   //when the company want to boost the system must check the following conditions.
//   // 1. check if the company subscription plan must be greater than boost endDate
//   // 2. check if there is less than 6 companies in boosting list. if the company is exceed to 6 allow company to
//   //  boost after 1 of the companies end data this company startDate must be > one of the nearest companies endDate.
//   // 3.
// });
