import { Application } from "../models/applicationModel.js";
import { BoostHistory } from "../models/boostHistoryModel.js";
import { Boost } from "../models/boostModel.js";
import { Company } from "../models/companyModel.js";
import { Group } from "../models/groupModel.js";
import { News } from "../models/newsModel.js";
import { Institution } from "../models/organizationModel.js";
import { Payment } from "../models/paymentModel.js";
import { Rate } from "../models/ratesModel.js";
import { Save } from "../models/saveModel.js";
import { SubscriptionHistory } from "../models/subscriptionHistoryModel.js";
import { Subscription } from "../models/subscriptionModel.js";
import { User } from "../models/userModel.js";
import { View } from "../models/viewModel.js";
import { Youtube } from "../models/youtubeModel.js";
import AppError from "./AppError.js";

export const selectModel = (name, next) => {
  let model;
  switch (name) {
    case "users":
      model = User;
      break;
    case "institutions":
      model = Institution;
      break;
    case "companies":
      model = Company;
      break;
    case "cases":
      model = Case;
      break;
    case "categories":
      model = Category;
      break;
    case "applications":
      model = Application;
      break;
    case "payments":
      model = Payment;
      break;
    case "case-managers":
      model = CaseManager;
      break;
    case "lawyers":
      model = Lawyer;
      break;
    case "groups":
      model = Group;
      break;
    case "youtubes":
      model = Youtube;
      break;
    case "news":
      model = News;
      break;
    case "rates":
      model = Rate;
      break;
    case "saves":
      model = Save;
      break;
    case "views":
      model = View;
      break;
    case "subscriptions":
      model = Subscription;
      break;
    case "subscriptionhistories":
      model = SubscriptionHistory;
      break;
    case "boosts":
      model = Boost;
      break;
    case "boosthistories":
      model = BoostHistory;
      break;
    default:
      return next(new AppError("something went wrong please try again!.", 500));
  }
  return model;
};
