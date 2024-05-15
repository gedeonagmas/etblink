const { Admin } = require("../models/adminModel");
const { Application } = require("../models/applicationModel");
const { Blog } = require("../models/blogModel");
const { BoostHistory } = require("../models/boostHistoryModel");
const { Boost } = require("../models/boostModel");
const { Company } = require("../models/companyModel");
const { Group } = require("../models/groupModel");
const { News } = require("../models/newsModel");
const { Institution } = require("../models/organizationModel");
const { Payment } = require("../models/paymentModel");
const { Rate } = require("../models/ratesModel");
const { Sales } = require("../models/salesModel");
const { Save } = require("../models/saveModel");
const { SubscriptionHistory } = require("../models/subscriptionHistoryModel");
const { Subscription } = require("../models/subscriptionModel");
const { User } = require("../models/userModel");
const { View } = require("../models/viewModel");
const { Visitor } = require("../models/visitorModel");
const { Youtube } = require("../models/youtubeModel");
const AppError = require("./AppError");

const selectModel = (name, next) => {
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
    case "blogs":
      model = Blog;
      break;
    case "sales":
      model = Sales;
      break;
    case "visitors":
      model = Visitor;
      break;
    case "admins":
      model = Admin;
      break;
    default:
      return next(new AppError("something went wrong please try again!.", 500));
  }
  return model;
};

module.exports = { selectModel };
