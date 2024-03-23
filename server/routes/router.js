import express from "express";
import { upload } from "../utils/upload.js";
import { authorization } from "../middleware/authorization.js";
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

const files = upload.fields([
  { name: "attachments", maxCount: 10 },
  { name: "profilePicture", maxCount: 1 },
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

router.route("/updatePassword").put(authentication, updatePassword);

//factory route
router.route("/:table/:id").get(authentication, authorization, _read_single);

const decrypt = async (req, res, next) => {
  const ENC = "bf3c199c2470cb477d907b1e0917c17f";
  const IV = "5183666c72eec9e4";
  const ALGO = "aes-256-cbc";

  // let cipher = crypto.createCipheriv(ALGO, ENC, IV);
  // let encrypted = cipher.update("gedi", "utf8", "base64");
  // encrypted += cipher.final("base64");

  try {
    let decipher = crypto.createDecipheriv(ALGO, ENC, IV);
    let decrypted = decipher.update(req.query.q, "base64", "utf8");
    decrypted + decipher.final("utf8");
    console.log(decrypted, "decrypted");
  } catch (e) {
    console.log(e.message, "eeeeeeeeeee");
  }

  // const encrypted_key = encrypt("HelloWorld");
  // const decrypted_key = decrypt(encrypted_key);

  // next();
};

router
  .route("/:table")
  .post(authentication, authorization, files, _create)
  .get(authentication, authorization, _read)
  .put(authentication, authorization, files, _update)
  .delete(authentication, authorization, _delete)
  .patch(authentication, authorization, aggregate);

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
export { router, chatRouter };
