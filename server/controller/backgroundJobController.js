const { User } = require("../models/userModel");
const { Notification } = require("../models/notificationModel");
const { sendEmailHandler } = require("./emailController");
const cron = require("node-cron");

const boost = async () => {
  const date = new Date().toISOString().split("T")[0];
  let remainingDate = 0;

  const parser = (counter) => {
    const expiredDate = date.split("-")[2] * 1 + counter;
    remainingDate = counter;
    return Date.parse(
      `${date.split("-")[0]}-${date.split("-")[1]}-${expiredDate}`
    );
  };

  const emailSender = async (subject, message, e) => {
    const from = "billing@etblink.com";

    // send local notification
    await Notification.create({
      message,
      role: e?.role,
      sender: "etblink",
      receiver: e?._id,
    });

    // send email
    return sendEmailHandler({ subject, message, to: e?.email, from });
  };

  const users = await User.find({ role: "company" }).populate("user");
  cron.schedule("12 12 7,14 * *", () => {
    users?.map(async (e) => {
      //for not yet boosted companies
      if (e?.user?.boostEndDate === 0 || e?.user?.boostStartDate === 0) {
        const subject = "Boost your company.";
        const message =
          "Boost your company to increase your visibility across the world.";

        emailSender(subject, message, e);
      }

      //for not yet subscribed company
      if (
        e?.user?.subscriptionEndDate === 0 ||
        e?.user?.subscriptionStartDate === 0
      ) {
        const subject = "Add Subscription to your company.";
        const message =
          "Subscribe your company to increase your visibility across the world.";

        emailSender(subject, message, e);
      }

      //boosted expired warning notification
      if (
        parser(7) * 1 === e?.user?.boostEndDate * 1 ||
        parser(14) * 1 === e?.user?.boostEndDate * 1
      ) {
        const subject = "Boost your company.";
        const message = `Your boost plan remains ${remainingDate} date.`;

        emailSender(subject, message, e);
      }

      //subscription expired warning notification
      if (
        parser(7) * 1 === e?.user?.subscriptionEndDate * 1 ||
        parser(14) * 1 === e?.user?.subscriptionEndDate * 1
      ) {
        const subject = "Subscription Expired.";
        const message = `Your Subscription plan remains ${remainingDate} date.`;

        emailSender(subject, message, e);
      }

      //subscription expired notification
      if (
        Date.parse(date) * 1 > e?.user?.subscriptionEndDate * 1 &&
        e?.user?.subscriptionEndDate !== 0
      ) {
        const subject = "Subscription Expired.";
        const message = `Your Subscription plan is Expired.`;
        e.user.isSubscribed = false;
        await e.user.save();
        emailSender(subject, message, e);
      }

      //boosting expired notification
      if (
        Date.parse(date) * 1 > e?.user?.boostEndDate * 1 &&
        e?.user?.boostEndDate !== 0
      ) {
        const subject = "Boost Expired.";
        const message = `Your Boost plan is Expired.`;
        e.user.isBoosted = false;
        await e.user.save();
        emailSender(subject, message, e);
      }
    });
  });
};

module.exports = { boost };
