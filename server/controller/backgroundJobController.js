const { User } = require("../models/userModel");
const { sendEmailHandler } = require("./emailController");
const cron = require("node-cron");
const { BoostHistory } = require("../models/boostHistoryModel");
const { SubscriptionHistory } = require("../models/subscriptionHistoryModel");
const { sendNotificationHandler } = require("./utilityController");
const { message } = require("./../utils/messages");

const backgroundJob = async () => {
  const date = new Date().toISOString().split("T")[0];
  let remainingDate = 0;

  const parser = (counter) => {
    const expiredDate = date.split("-")[2] * 1 + counter;
    remainingDate = counter;
    return Date.parse(
      `${date.split("-")[0]}-${date.split("-")[1]}-${expiredDate}`
    );
  };

  const emailSender = async (e, service, startDate, endDate) => {
    const admin = await User.find({ role: "admin" });
    if (admin) {
      [
        {
          receiver: admin[0]?.user?.user?._id,
          type: "admin",
          role: "admin",
          email: admin[0]?.email,
        },
        {
          receiver: req?.user?._id,
          type: "user",
          role: e?.role,
          email: e?.email,
        },
      ]?.map((e) => {
        sendNotificationHandler({
          message:
            service === "Boost Plan" || service === "Service Plan"
              ? `Your ${service} has been Expired`
              : `A new ${service} plan has been added to ${
                  e?.type === "user" ? "your company" : req.user.email
                }. The ${service} plan will be available from ${new Date(
                  startDate
                ).toDateString()} to ${new Date(endDate).toDateString()}. ${
                  e?.type === "user"
                    ? "Thank you for working with us!"
                    : "Thank you sir!"
                }`,
          role: e?.role,
          receiver: e?.receiver,
        });

        sendEmailHandler({
          subject:
            service === "Boost Plan" || service === "Service Plan"
              ? `Your ${service} has been Expired`
              : `New ${service} plan added`,
          to: e?.email,
          from: message.emailOne,
          message:
            service === "Boost Plan" || service === "Service Plan"
              ? `Your ${service} has been Expired`
              : `A new ${service} plan has been added to ${
                  e?.type === "user" ? "your company" : req.user.email
                }. The ${service} plan will be available from ${new Date(
                  history.startDate
                ).toDateString()} to ${new Date(
                  history.endDate
                ).toDateString()}. ${
                  e?.type === "user"
                    ? "Thank you for working with us!"
                    : "Thank you sir!"
                }`,
          button: message.boost.button,
          link: message.boost.link,
        });
      });
    }
  };

  const emailSenderSingle = async (subject, message, e) => {
    sendNotificationHandler({
      message: message,
      role: e?.role,
      receiver: e?.receiver,
    });

    sendEmailHandler({
      subject: subject,
      to: e?.email,
      from: message.emailOne,
      message: message,
      button: message.boost.button,
      link: message.boost.link,
    });
  };

  const boostHistory = await BoostHistory.find({
    startDate: Date.now(),
    approved: true,
  });

  if (boostHistory?.length > 0) {
    boostHistory?.map(async (history) => {
      const company = await User.find({ user: history?.company }).populate(
        "user"
      );

      company[0].user.boostStartDate = history.startDate;
      company[0].user.boostEndDate = history.endDate;
      company[0].user.isBoosted = true;
      company[0].user.boostStatus = "Started";
      const response = await company[0].user.save();

      if (response) {
        emailSender(company[0], "Boost", history?.startDate, history?.endDate);
      }
    });
  }

  const subscriptionHistory = await SubscriptionHistory.find({
    startDate: Date.now(),
    approved: true,
  });

  if (subscriptionHistory?.length > 0) {
    subscriptionHistory?.map(async (history) => {
      const company = await User.find({ user: history?.company }).populate(
        "user"
      );

      company[0].user.subscriptionStartDate = history.startDate;
      company[0].user.subscriptionEndDate = history.endDate;
      company[0].user.isSubscribed = true;
      company[0].user.subscriptionStatus = "Started";
      const response = await company[0].user.save();

      if (response) {
        emailSender(company[0], "Boost", history?.startDate, history?.endDate);
      }
    });
  }

  const users = await User.find({ role: "company" }).populate("user");
  cron.schedule("12 12 7,14 * *", () => {
    users?.map(async (e) => {
      //for not yet boosted companies
      if (e?.user?.boostEndDate === 0 || e?.user?.boostStartDate === 0) {
        const subject = "Boost your company.";
        const message =
          "Boost your company to increase your visibility across the world.";

        emailSenderSingle(subject, message, e);
      }

      //for not yet subscribed company
      if (
        e?.user?.subscriptionEndDate === 0 ||
        e?.user?.subscriptionStartDate === 0
      ) {
        const subject = "Add Subscription to your company.";
        const message =
          "Subscribe your company to increase your visibility across the world.";

        emailSenderSingle(subject, message, e);
      }

      //boosted expired warning notification
      if (
        parser(7) * 1 === e?.user?.boostEndDate * 1 ||
        parser(14) * 1 === e?.user?.boostEndDate * 1
      ) {
        const subject = "Extend your boost plan.";
        const message = `Your boost plan remains ${remainingDate} date.`;

        emailSenderSingle(subject, message, e);
      }

      //subscription expired warning notification
      if (
        parser(7) * 1 === e?.user?.subscriptionEndDate * 1 ||
        parser(14) * 1 === e?.user?.subscriptionEndDate * 1
      ) {
        const subject = "Extend your subscription plan.";
        const message = `Your Subscription plan remains ${remainingDate} date.`;

        emailSenderSingle(subject, message, e);
      }

      //subscription expired notification
      if (
        Date.parse(date) * 1 > e?.user?.subscriptionEndDate * 1 &&
        e?.user?.subscriptionEndDate !== 0
      ) {
        const message = `Your Service plan has been Expired.`;
        e.user.isSubscribed = false;
        const response = await e.user.save();
        if (response) {
          emailSender(e, "Service Plan", history?.startDate, history?.endDate);
        }
      }

      //boosting expired notification
      if (
        Date.parse(date) * 1 > e?.user?.boostEndDate * 1 &&
        e?.user?.boostEndDate !== 0
      ) {
        const subject = "Boost Expired.";
        const message = `Your Boost plan is Expired.`;
        e.user.isBoosted = false;
        const response = await e.user.save();
        if (response) {
          emailSender(e, "Boost Plan", history?.startDate, history?.endDate);
        }
      }
    });
  });
};

module.exports = { backgroundJob };
