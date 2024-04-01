import express from "express";
import { upload } from "../utils/upload.js";
// import { authorization } from "../middleware/authorization.js";
import { authentication } from "../middleware/authentication.js";
import {
  _create,
  _delete,
  _read,
  _read_single,
  _update,
} from "../controller/factoryController.js";

import {
  signupHandler,
  loginHandler,
  forgetPassword,
  resetPassword,
  updateProfileInfo,
  updateProfilePicture,
  readProfileInfo,
  updatePassword,
  logoutHandler,
} from "../controller/userController.js";
import { aggregate } from "../controller/aggregationController.js";
import {
  chatCreate,
  chatDelete,
  chatRead,
  chatUpdate,
} from "../controller/chatController.js";
import CryptoJS from "crypto-js";
import crypto from "crypto";
import asyncCatch from "express-async-catch";

const router = express.Router();
const chatRouter = express.Router();
const accountRouter = express.Router();

const files = upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "logo", maxCount: 1 },
  { name: "banner", maxCount: 1 },
  { name: "galleries", maxCount: 10 },
  { name: "newsPhoto", maxCount: 1 },
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

accountRouter.route("/updatePassword").put(authentication, updatePassword);

//factory route
router.route("/:table/:id").get(authentication, _read_single);

router
  .route("/:table")
  .post(authentication, files, _create)
  .get(authentication, _read)
  .put(authentication, files, _update)
  .delete(authentication, _delete)
  .patch(authentication, aggregate);

//chat route
chatRouter.route("/:id").get(chatRead);
chatRouter
  .route("/")
  .post(files, chatCreate)
  .get(chatRead)
  .put(files, chatUpdate)
  .delete(chatDelete);

//aggregation
// router.route("/stats/:table").patch(authentication, authorization, firstPhase);
export { router, chatRouter, accountRouter };
