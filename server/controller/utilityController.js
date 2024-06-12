const asyncCatch = require("express-async-catch");
const { Company } = require("../models/companyModel");
const { Rate } = require("../models/ratesModel");
const { Save } = require("../models/saveModel");
const { View } = require("../models/viewModel");
const AppError = require("../utils/AppError");
const { User } = require("../models/userModel");
const { BoostHistory } = require("../models/boostHistoryModel");
const { SubscriptionHistory } = require("../models/subscriptionHistoryModel");
const { Payment } = require("../models/paymentModel");
const { sendEmailHandler } = require("./emailController");
const { Notification } = require("../models/notificationModel");
const { Category } = require("../models/categoryModel");
const { UserProfile } = require("../models/userProfile");
const message = require("./../utils/messages");
const { Chat } = require("../models/chatModel");

const sendNotificationHandler = async ({ message, role, receiver }) => {
  return await Notification.create({
    message,
    role,
    receiver,
  });
};

const emailAndNotificationSender = async (subject, message, e, from) => {
  sendNotificationHandler(message, e?.role, e?.user?._id);
  return sendEmailHandler({ subject, message, to: e?.email, from });
};

const createRate = asyncCatch(async (req, res, next) => {
  const rateHandler = async (val) => {
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

    // const rateAccepter =
    //   req.body.type === "company"
    //     ? await Company.findById(req.body.accepter)
    //     : await UserProfile.findById(req.body.accepter);

    const user = await User.find({ user: req.body.accepter }).populate("user");

    const result = rate?.filter(
      (e) => e?._id?.accepter?.toString() === req.body.accepter
    );

    // console.log(result, "result");
    // rateAccepter.rating.total = result[0]?.total;
    // rateAccepter.rating.average = result[0]?.average?.toFixed(1);
    // console.log(user);
    user[0].user.rating.total = result[0]?.total;
    user[0].user.rating.average = result[0]?.average?.toFixed(1);

    const response = await user[0].user.save();
    if (response) {
      sendNotificationHandler({
        message: message.rateMessage({
          name: req.body.fullName,
          message: req.body.message,
          value: req.body.value,
          type: val,
        }),
        role: req.body.role,
        receiver: req.body.accepter,
      });

      sendEmailHandler({
        subject: message.rateSubject(req.body.fullName),
        to: user[0]?.email,
        from: message.emails.emailOne,
        message: message.rateMessage({
          name: req.body.fullName,
          message: req.body.message,
          value: req.body.value,
          type: val,
        }),
        button: message.rateButton(),
        link: message.rateLink(req.body.for),
        next,
      });
    }
  };

  const data = await Rate.find({
    rater: req.body.rater,
    accepter: req.body.accepter,
  });

  if (data.length > 0) {
    await Rate.findOneAndUpdate({ _id: data[0]?._id }, { ...req.body });
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
  } else {
    await Save.create(req.body);

    const user = await User.find({ user: req.body.company }).populate("user");
    user[0].user.saves.total = user[0].user.saves.total + 1;
    user[0].user.saves.available = user[0].user.saves.available + 1;

    const response = await user[0].user.save();
    const saver = await User.find({ user: req.body.saver });

    if (response) {
      sendNotificationHandler({
        message: message.saveMessage({
          email: saver[0]?.email ? saver[0]?.email : "New Client",
        }),
        role: req.body.role,
        receiver: req.body.accepter,
      });

      sendEmailHandler({
        subject: message.saveSubject(),
        to: user[0]?.email,
        from: message.emails.emailOne,
        message: message.saveMessage({
          name: saver[0]?.email ? saver[0]?.email : "New Client",
        }),
        button: message.saveButton(),
        link: message.saveLink(),
        response: "company added to your list.",
        res,
        next,
      });
    }

    return res.status(200).json({
      status: "Created",
      message: "company added to your list.",
    });
  }
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
  const user = await User.find({ user: req.body.company });

  const views = await View.find({
    company: req.body.company,
    viewer: req.body.viewer,
  });
  if (views?.length > 0) {
    return res
      .status(200)
      .json({ message: "Company is already in your list." });
  } else {
    await View.create(req.body);

    const company = await Company.findById(req.body.company);
    company.views.total = company.views.total + 1;
    company.views.available = company.views.available + 1;
    const response = await company.save();

    const viewer = await User.find({ user: req.body.viewer });

    if (response) {
      sendNotificationHandler({
        message: message.viewMessage({
          email: viewer[0]?.email ? viewer[0]?.email : "New Client",
        }),
        role: req.body.role,
        receiver: company?._id,
      });

      sendEmailHandler({
        subject: message.viewSubject(),
        to: user[0]?.email,
        from: message.emails.emailOne,
        message: message.viewMessage({
          name: viewer[0]?.email ? viewer[0]?.email : "New Client",
        }),
        button: message.viewButton(),
        link: message.viewLink(),
        next,
      });
    }

    return res.status(200).json({
      status: "Created",
      message: "company added to your list.",
    });
  }
});

const upgradeHandler = asyncCatch(async (req, res, next) => {
  const account =
    req.body.role === "company"
      ? await Company.create({})
      : { _id: req.body.user };

  if (account._id) {
    await User.findByIdAndUpdate(
      { _id: req.body._id },
      {
        $set: { user: account._id, role: req.body.role },
      }
    );

    if (req.body.role === "sales") {
      const profile = await UserProfile.findById(account._id);

      profile.earn.total = 0;
      profile.earn.current = 0;
      profile.earn.withdraw = 0;
      profile.rating.total = 0;
      profile.rating.average = 0;

      await profile.save();
    }

    if (req.body.role === "company") {
      await UserProfile.findByIdAndDelete(req.body.user);

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
    }

    const admin = await User.find({ role: "admin" });
    if (admin) {
      sendNotificationHandler({
        message: message.upgradeMessage({
          email: req.user.email,
          role: req.body.role,
        }),
        role: req.body.role,
        receiver: admin[0]?.user?.user?._id,
      });

      sendEmailHandler({
        subject: message.upgrade.subject,
        to: admin[0]?.email,
        from: message.emails.emailOne,
        message: message.upgradeMessage({
          email: req.user.email,
          role: req.body.role,
        }),
        button: message.upgradeButton(),
        link: message.upgradeLink(),
        response:
          "Account upgraded successfully Please Login Again to Continue.",
        res,
        next,
      });
    }

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

    const history = await BoostHistory.create({
      company: req.body.company,
      boost,
      startDate: Date.parse(new Date(startDate)),
      endDate: Date.parse(new Date(endDate)),
      payFrom,
      approved: payFrom === "online" || payFrom === "deposit" ? true : false,
      bankDetail: payFrom === "bank" ? req.body.bankDetail : undefined,
      checkDetail: payFrom === "check" ? req.body.checkDetail : undefined,
    });

    const admin = await User.find({ role: "admin" });
    if (admin && history) {
      [
        {
          receiver: admin[0]?.user?.user?._id,
          type: "admin",
          role: req.body.role,
          email: admin[0]?.email,
        },
        {
          receiver: req?.user?._id,
          type: "user",
          role: req.user.role,
          email: req.user.email,
        },
      ]?.map((e) => {
        sendNotificationHandler({
          message: message.boostMessage({
            email: req.user.email,
            type: e.type,
            startDate: history?.startDate,
            endDate: history?.endDate,
          }),
          role: e?.role,
          receiver: e?.receiver,
        });

        sendEmailHandler({
          subject: message.boostSubject(),
          to: e?.email,
          from: message.emails.emailTwo,
          message: message.boostMessage({
            email: req.user.email,
            type: e?.type,
            startDate: history?.startDate,
            endDate: history?.endDate,
          }),
          button: message.boostButton(),
          link: message.boostLink(),
          response: "Boost plan added successfully.",
          res,
          next,
        });
      });
    }
  } else if (serviceType === "serviceFee") {
    company.isSubscribed =
      payFrom === "online" || payFrom === "deposit" ? true : false;

    company.subscriptionEndDate = Date.parse(new Date(endDate));
    company.subscriptionStartDate = Date.parse(new Date(startDate));

    company.subscriptionStatus =
      payFrom === "online" || payFrom === "deposit" ? "Payed" : "Pending";

    payFrom === "deposit" &&
      (company.currentBalance = company.currentBalance * 1 - amount * 1);

    await company.save();

    const history = await SubscriptionHistory.create({
      company: req.body.company,
      subscription,
      startDate: Date.parse(new Date(startDate)),
      endDate: Date.parse(new Date(endDate)),
      payFrom,
      approved: payFrom === "online" || payFrom === "deposit" ? true : false,
      bankDetail: payFrom === "bank" ? req.body.bankDetail : undefined,
      checkDetail: payFrom === "check" ? req.body.checkDetail : undefined,
    });

    const admin = await User.find({ role: "admin" });
    if (admin && history) {
      [
        {
          receiver: admin[0]?.user?.user?._id,
          type: "admin",
          role: req.body.role,
          email: admin[0]?.email,
        },
        {
          receiver: req?.user?._id,
          type: "user",
          role: req.user.role,
          email: req.user.email,
        },
      ]?.map((e) => {
        sendNotificationHandler({
          message: message.serviceMessage({
            email: req.user.email,
            type: e.type,
            startDate: history?.startDate,
            endDate: history?.endDate,
          }),
          role: e?.role,
          receiver: e?.receiver,
        });

        sendEmailHandler({
          subject: message.serviceSubject(),
          to: e?.email,
          from: message.emails.emailTwo,
          message: message.serviceMessage({
            email: req.user.email,
            type: e?.type,
            startDate: history?.startDate,
            endDate: history?.endDate,
          }),
          button: message.serviceButton(),
          link: message.serviceLink(),
          response: "Service plan added successfully.",
          res,
          next,
        });
      });
    }
  } else if (serviceType === "fund") {
    const history = await Payment.create({
      company: req.body.company,
      amount: amount,
      payFrom: payFrom,
      bankDetail: payFrom === "bank" ? req.body.bankDetail : undefined,
      checkDetail: payFrom === "check" ? req.body.checkDetail : undefined,
    });

    const admin = await User.find({ role: "admin" });
    if (admin && history) {
      sendNotificationHandler({
        message: message.fundMessage({ email: req.body.email, amount: amount }),
        role: "admin",
        receiver: admin[0]?.user?.user?._id,
      });

      sendEmailHandler({
        subject: message.fundSubject(),
        to: admin[0]?.email,
        from: message.emails.emailTwo,
        message: message.fundMessage({ email: req.body.email, amount: amount }),
        button: message.fundButton(),
        link: message.fundLink(),
        response: "Transaction has been made successfully.",
        res,
        next,
      });
    }
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

        await company[0].user.save();
      }
    };

    approvalType === "boosting" && approveHandler(BoostHistory);
    approvalType === "subscription" && approveHandler(SubscriptionHistory);
    approvalType === "fund" && approveHandler(Payment);

    actionType === "boosting" && startHandler(BoostHistory, "boost");
    actionType === "subscription" &&
      startHandler(SubscriptionHistory, "subscribe");

    const user = await User.find({ user: req.body.company });
    if (user) {
      sendNotificationHandler({
        message: message.approveMessage({ approvalType, actionType, value }),
        role: user[0]?.role,
        receiver: user[0]?.user?._id,
      });

      sendEmailHandler({
        subject: message.approveSubject(),
        to: user[0]?.email,
        from: message.emails.emailTwo,
        message: message.approveMessage({ approvalType, actionType, value }),
        button: message.approveButton(),
        link: message.approveLink(),
        response: "Transaction has been Successful Thank you!",
        res,
        next,
      });
    }
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
        _id: {
          category: "$category",
          type: "$type",
          total: {
            $sum: 1,
          },
        },
      },
    },
  ]);

  const types =
    req.query.type === "local"
      ? { type: "local" }
      : req.query.type === "global"
      ? { type: "global" }
      : {};
  const mainCategory = await Category.find(
    types,
    "category categoryImage type"
  );
  let finalData = [];
  categories?.map((c) => {
    const filtered = mainCategory.filter((f) => {
      // console.log(f.category,c._id, f.type, "ffffffffffff");

      if (f.category === c._id?.category && c._id.type === f.type) {
        return true;
      } else {
        return false;
      }
    });
    // console.log(filtered?.length > 0, filtered, "ffffffffffff");
    finalData.push({
      category: c._id.category,
      total: c._id.total,
      categoryImage: filtered?.length > 0 ? filtered[0].categoryImage : "",
      type: filtered?.length > 0 ? filtered[0].type : "",
    });
  });

  // console.log(finalData, "final");
  const type = await Company.aggregate([
    {
      $group: {
        _id: "$type",
        total: {
          $sum: 1,
        },
      },
    },
  ]);

  // console.log(finalData, "final");
  return res.status(200).json({
    status: "Read",
    category: finalData,
    type: type,
  });
});

const companyDashboardAggregation = asyncCatch(async (req, res, next) => {
  const saves = await Save.find({ company: req.query.id })
    .limit(10)
    .select("createdAt saver")
    .populate("saver")
    .sort("-createdAt");

  const views = await View.find({ company: req.query.id })
    .limit(10)
    .select("createdAt viewer")
    .populate("viewer")
    .sort("-createdAt");

  const messages = await Chat.find({
    receiver: req.query.id,
    messageType: "text",
  })
    .limit(10)
    .populate("sender")
    .sort("-createdAt");

  const view = await View.aggregate([
    {
      $group: {
        _id: {
          createdAt: "$date",
          company: "$company",
        },
        total: {
          $sum: 1,
        },
      },
    },
  ]);

  const save = await Save.aggregate([
    {
      $group: {
        _id: {
          createdAt: "$date",
          company: "$company",
        },
        total: {
          $sum: 1,
        },
      },
    },
  ]);

  const company = await Company.findById(req.query.id).populate("sales");

  const boost = await BoostHistory.find({
    company: req.query.id,
  }).countDocuments();

  const subscription = await SubscriptionHistory.find({
    company: req.query.id,
  }).countDocuments();

  const fund = await Payment.find({
    company: req.query.id,
  }).countDocuments();

  // console.log(
  //   view.filter((e) => e._id.company.toString() === req.query.id),
  //   "final"
  // );

  console.log(boost, "final");
  return res.status(200).json({
    view: view?.filter((e) => e?._id?.company?.toString() === req?.query?.id),
    save: save?.filter((e) => e?._id?.company?.toString() === req?.query?.id),
    views,
    saves,
    boost,
    subscription,
    fund,
    company,
    messages,
  });
});

const recentlyAddedCompany = asyncCatch(async (req, res, next) => {
  const importer = await Company.find(
    { category: "Advertisement" },
    "name title logo"
  ).limit(10);

  const exporter = await Company.find(
    { category: "Exporters" },
    "name title logo"
  ).limit(10);

  const government = await Company.find(
    { category: "Government" },
    "name title logo"
  ).limit(10);

  const tourism = await Company.find(
    { category: "Tourism" },
    "name title logo"
  ).limit(10);

  // console.log(importer, "final");
  return res.status(200).json({
    importer,
    exporter,
    government,
    tourism,
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
  sendNotificationHandler,
  notificationView,
  recentlyAddedCompany,
  companyDashboardAggregation,
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
