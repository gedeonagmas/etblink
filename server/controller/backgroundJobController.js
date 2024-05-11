import asyncCatch from "express-async-catch";
import { User } from "../models/userModel.js";
import { Notification } from "../models/notificationModel.js";
import { sendEmailHandler } from "./emailController.js";
import cron from "node-cron";

export const boost = async () => {
  let counter = 15;
  const date = new Date().toISOString().split("T")[0];
  // date.setHours(0);
  // date.setMinutes(0);
  // date.setSeconds(0);

  // const time = date.setDate(date.getDate() + counter).toLocaleString();
  const time = date.split("T")[0];
  // let c = date.split("T")[0];
  const day = date.split("-")[2] * 1 + counter;
  const fullDate = Date.parse(
    `${date.split("-")[0]}-${date.split("-")[1]}-${day}`
  );
  console.log(fullDate, "time");
  const users = await User.find({ role: "company" }).populate("user");
  cron.schedule("1,10,20,30,40,50,59 * * * * *", () => {
    users?.map(async (e) => {
      if (e?.user?.boostEndDate === 0 || e?.user?.boostStartDate === 0) {
        //send email for companies which are not start boosting
        const subject = "Boost your company.";
        const message =
          "Boost your company to increase your visibility across the world.";
        const from = "billing@etblink.com";
        const to = "gedeonagmas2580@gmail.com";

        //send local notification
        // await Notification.create({
        //   message,
        //   role: e?.role,
        //   sender: "etblink",
        //   receiver: e?._id,
        // });
        // console.log("company 1");

        //send email
        // return sendEmailHandler(subject, message, to, from);
      } else {
        for (let i = 1; i <= counter; i++) {
          if (time + i >= e?.user?.boostEndDate) {
            const subject = "Boost your company.";
            const message =
              "Boost your company to increase your visibility across the world.";
            const from = "billing@etblink.com";
            const to = "gedeonagmas2580@gmail.com";

            //send local notification
            // await Notification.create({
            //   message,
            //   role: e?.role,
            //   sender: "etblink",
            //   receiver: e?._id,
            // });

            //send email
            // return console.log("company 2");
            // return sendEmailHandler(subject, message, to, from);
          }
        }
      }
    });
  });
};

export const subscribe = async () => {
  //
};
