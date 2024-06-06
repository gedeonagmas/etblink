const { Banner } = require("../models/bannerModel");
const { Blog } = require("../models/blogModel");
const { BoostHistory } = require("../models/boostHistoryModel");
const { Boost } = require("../models/boostModel");
const { Category } = require("../models/categoryModel");
const { Company } = require("../models/companyModel");
const { Group } = require("../models/groupModel");
const { News } = require("../models/newsModel");
const { Notification } = require("../models/notificationModel");
const { Payment } = require("../models/paymentModel");
const { Place } = require("../models/placeModel");
const { UserProfile } = require("../models/userProfile");
const { Rate } = require("../models/ratesModel");
const { Save } = require("../models/saveModel");
const { Sponsor } = require("../models/sponsorsModel");
const { SubscriptionHistory } = require("../models/subscriptionHistoryModel");
const { Subscription } = require("../models/subscriptionModel");
const { User } = require("../models/userModel");
const { View } = require("../models/viewModel");
const { Youtube } = require("../models/youtubeModel");
const { Job } = require("../models/jobModel");
const { Commission } = require("../models/salesCommission");
const AppError = require("./AppError");

const selectModel = (name, next) => {
  let model;
  switch (name) {
    case "users":
      model = User;
      break;
    case "companies":
      model = Company;
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
    case "jobs":
      model = Job;
      break;
    case "places":
      model = Place;
      break;
    case "notifications":
      model = Notification;
      break;
    case "banners":
      model = Banner;
      break;
    case "sponsors":
      model = Sponsor;
      break;
    case "userProfiles":
      model = UserProfile;
      break;
    case "commissions":
      model = Commission;
      break;
    default:
      return next( 
        new AppError("Something went wrong please try again!!!", 500)
      );
  }
  return model;
};

module.exports = { selectModel };
