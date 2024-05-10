import asyncCatch from "express-async-catch";
import { User } from "../models/userModel.js";

export const backgroundJobController = (cron) =>
  asyncCatch(async () => {
    let counter = 5;
    const date = new Date();
    const time = date.setDate(date.getDate() + counter);

    const users = await User.find({ role: "company" }).populate("user");
    users?.map((e) => {
      if (e?.user?.boostEndDate === 0 && e?.user?.boostStartDate === 0) {
        //send email for companies which are not start boosting
        const subject = "Boost your company.";
        const message =
          "Boost your company to increase your visibility across the world.";
        const from = "billing@etblink.com";
        const to = "gedeonagmas2580@gmail.com";
        sendEmailHandler(
          subject,
          message,
          to
          // from + " " + fullName,
          // response,
          // res,
          // next
        );
      } else {
        for (let i = 1; i <= counter; i++) {
          if (time + i >= e?.user?.boostEndDate) {
            sendEmailHandler(
              subject,
              message,
              to
              // from + " " + fullName,
              // response,
              // res,
              // next
            );
          }
        }
      }
    });
    // console.log(companies);
    // console.log(d);
    // console.log("background job running...");
    //   console.log(cron, "cron");
  });
