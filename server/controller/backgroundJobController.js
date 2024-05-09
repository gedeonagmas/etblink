import asyncCatch from "express-async-catch";
import { Company } from "../models/companyModel.js";
import { User } from "../models/userModel.js";

export const backgroundJobController = (cron) =>
  asyncCatch(async () => {
    const date = new Date().setDate(date.getDate() + 5);
    const companies = await User.find({ boostEndDate: { $gte: date } });
    console.log(companies);
    console.log("background job running...");
    //   console.log(cron, "cron");
  });
