const express = require("express");
const { upload } = require("../utils/upload.js");
// const { authorization } =require("../middleware/authorization.js";
const { authentication } = require("../middleware/authentication.js");
const {
  _create,
  _delete,
  _read,
  _read_single,
  _update,
} = require("../controller/factoryController.js");

const {
  signupHandler,
  loginHandler,
  forgetPassword,
  resetPassword,
  updateProfileInfo,
  updateProfilePicture,
  readProfileInfo,
  updatePassword,
  logoutHandler,
  updateUsersCredentials,
} = require("../controller/userController.js");
const { aggregate } = require("../controller/aggregationController.js");
const {
  chatCreate,
  chatDelete,
  chatRead,
  chatUpdate,
} = require("../controller/chatController.js");
const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const asyncCatch = require("express-async-catch");
const {
  createRate,
  createSave,
  createView,
  deleteRate,
  deleteSave,
  readMultipleRate,
  readRate,
  upgradeHandler,
  companyAggregation,
  paymentHandler,
  notificationView,
  recentlyAddedCompany,
  companyDashboardAggregation,
  adminDashboardAggregation,
} = require("../controller/utilityController.js");
const { sendEmailHandler } = require("../controller/emailController.js");

const router = express.Router();
const chatRouter = express.Router();
const utilityRouter = express.Router();

const files = upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "logo", maxCount: 1 },
  { name: "banner", maxCount: 1 },
  { name: "galleries", maxCount: 10 },
  { name: "newsPhoto", maxCount: 1 },
  { name: "video", maxCount: 1 },
  { name: "chatFile", maxCount: 10 },
  { name: "blogImage", maxCount: 1 },
  { name: "categoryImage", maxCount: 1 },
  { name: "sponsorImage", maxCount: 1 },
  { name: "bannerImage", maxCount: 1 },
]);

//user account route
router.route("/signup").post(files, signupHandler);

router.route("/login").post(loginHandler);
router.route("/logout").post(logoutHandler);

router.route("/forgetPassword").post(forgetPassword);

router.route("/resetPassword").post(resetPassword);

router.route("/readProfileInfo").get(authentication, readProfileInfo);

router.route("/updateProfileInfo").put(authentication, updateProfileInfo);

router
  .route("/updateProfilePicture")
  .put(authentication, files, updateProfilePicture);

utilityRouter.route("/updatePassword").put(authentication, updatePassword);
utilityRouter
  .route("/updateUsersCredentials")
  .put(authentication, updateUsersCredentials);

utilityRouter.route("/rate").post(authentication, createRate);
utilityRouter.route("/rate").get(readRate);
utilityRouter.route("/rateMultiple").get(authentication, readMultipleRate);
utilityRouter.route("/rate").delete(authentication, deleteRate);
utilityRouter.route("/save").post(authentication, createSave);
utilityRouter.route("/save").delete(authentication, deleteSave);
utilityRouter.route("/view").post(authentication, createView);
utilityRouter.route("/upgrade").post(authentication, upgradeHandler);
utilityRouter.route("/boost").post(authentication, paymentHandler);
utilityRouter.route("/companyAggregate").get(companyAggregation);
utilityRouter
  .route("/companyDashboardAggregation")
  .get(authentication, companyDashboardAggregation);
utilityRouter
  .route("/adminDashboardAggregation")
  .get(authentication, adminDashboardAggregation);
utilityRouter.route("/notificationView").put(authentication, notificationView);
utilityRouter.route("/recentlyAddedCompany").get(recentlyAddedCompany);

//factory route
router.route("/:table/:id").get(authentication, _read_single);
router.route("/sendEmail").post(async (req, res, next) => {
  const { from, to, message, subject, fullName } = req.body;
  // console.log(req.body, "body", next);
  const response = "Your email is sent successfully.";
  return sendEmailHandler({
    subject,
    message: `email: <${from}> name: <${fullName}> ${message}`,
    to,
    from: "billing@etblink.com",
    response,
    res,
    next,
  });

  // sendEmailHandler({
  //   subject,
  //   message,
  //   to,
  //   from: ,
  //   response,
  //   res,
  //   next,
  // });
});

router
  .route("/:table")
  .post(authentication, files, _create)
  .get(_read)
  .put(authentication, files, _update)
  .delete(authentication, _delete)
  .patch(authentication, aggregate);

//chat route
chatRouter.route("/:id").get(authentication, chatRead);
chatRouter
  .route("/")
  .post(authentication, files, chatCreate)
  .get(authentication, chatRead)
  .put(authentication, files, chatUpdate)
  .delete(authentication, chatDelete);

//aggregation
// router.route("/stats/:table").patch(authentication, authorization, firstPhase);
module.exports = { router, chatRouter, utilityRouter };
