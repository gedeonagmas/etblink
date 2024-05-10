import asyncCatch from "express-async-catch";
import { User } from "../models/userModel.js";
import { Notification } from "../models/notificationModel.js";
import { sendEmailHandler } from "./emailController.js";

export const boost = async () => {
  let counter = 5;
  const date = new Date();
  const time = date.setDate(date.getDate() + counter);

  const users = await User.find({ role: "company" }).populate("user");
  // console.log(users);
  users?.map(async (e) => {
    if (e?.user?.boostEndDate === 0 || e?.user?.boostStartDate === 0) {
      //send email for companies which are not start boosting
      const subject = "Boost your company.";
      const message =
        "Boost your company to increase your visibility across the world.";
      const from = "billing@etblink.com";
      const to = "gedeonagmas2580@gmail.com";
      // sendEmailHandler(
      //   subject,
      //   message,
      //   to, 
      //   from

      // );
      console.log(e?.user?.name,time, "company 1");

      //send local notification
      // const note = await Notification.create({
      //   message,
      //   role: e?.role,
      //   sender: "etblink",
      //   receiver: e?._id,
      // });
      // console.log(note, "note 1");
    } else {
      for (let i = 1; i <= counter; i++) {
        if (time + i >= e?.user?.boostEndDate) {
          const subject = "Boost your company.";
          const message =
            "Boost your company to increase your visibility across the world.";
          const from = "billing@etblink.com";
          const to = "gedeonagmas2580@gmail.com";
          // sendEmailHandler(
          //   subject,
          //   message,
          //   to,
          //   from
          // );
          console.log(e?.user?.name, "company 2");
          //send local notification
          // const note = await Notification.create({
          //   message,
          //   role: e?.role,
          //   sender: "etblink",
          //   receiver: e?._id,
          // });
          // console.log(note, "note 2");
        }
      }
    }
  });
};

export const subscribe = async () => {
  //
};
