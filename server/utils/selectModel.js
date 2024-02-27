import { Branch } from "../models/branchModel.js";
import { Company } from "../models/companyModel.js";
import { Donator } from "../models/donatorModel.js";
import { Receiver } from "../models/receiverModel.js";
import { User } from "../models/userModel.js";
import AppError from "./AppError.js";

export const selectModel = (name, next) => {
  let model;
  switch (name) {
    case "users":
      model = User;
      break;
    case "company":
      model = Company;
      break;
    case "branches":
      model = Branch;
      break;
    case "donator":
      model = Donator;
      break;
    case "receiver":
      model = Receiver;
      break;
    default:
      return next(
        new AppError("something went wrong unable to fetch the data.", 500)
      );
  }
  return model;
};
