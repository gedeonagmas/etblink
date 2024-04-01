import { Application } from "../models/applicationModel.js";
import { Company } from "../models/companyModel.js";
import { Group } from "../models/groupModel.js";
import { News } from "../models/newsModel.js";
import { Institution } from "../models/organizationModel.js";
import { Payment } from "../models/paymentModel.js";
import { User } from "../models/userModel.js";
import { Youtube } from "../models/youtube.js";
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
    default:
      return next(new AppError("something went wrong please try again!.", 500));
  }
  return model;
};
