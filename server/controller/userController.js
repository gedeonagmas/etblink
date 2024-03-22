import AppError from "../utils/AppError.js";
import asyncCatch from "express-async-catch";
import { User } from "../models/userModel.js";
import { tokenGenerator } from "../utils/tokenGenerator.js";
import crypto from "crypto";
import { sendEmailMessage } from "./emailController.js";
import { Lawyer } from "../models/lawyerModel.js";
import { CaseManager } from "../models/caseManagerModel.js";
import { Institution } from "../models/organizationModel.js";
import v2 from "./../config/cloudinary.js";
import { Private } from "../models/privateModel.js";
import { Company } from "../models/companyModel.js";

export const signupHandler = asyncCatch(async (req, res, next) => {
  const value = { ...req.body };
  const createAccount = async (model) => {
    const user = await User.create(req.body);
    if (user) {
      const account = await model.create({});
      if (account._id) {
        const data = await User.findByIdAndUpdate(
          { _id: user._id },
          {
            $set: { user: account._id },
          }
        );

        const token = tokenGenerator(res, data._id);

        return res
          .status(200)
          .json({ message: "Account Created Successfully", token, data });
      }
    } else {
      return next(new AppError("problem with creating account try again", 500));
    }
  };

  switch (req.body.role) {
    case "visitor":
      return createAccount(Visitor);
    case "company":
      // const remove = ["firstName", "middleName", "lastName", "gender"];
      // remove.forEach((el) => delete value[el]);
      return createAccount(Company);
    case "seller":
      return createAccount(Seller);
    default:
      return next(new AppError("problem with creating account try again", 500));
  }
});

export const loginHandler = asyncCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("provide email and password", 404));
  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return next(
      new AppError(
        "there is no user found by this user name please register first",
        404
      )
    );

  const isPasswordCorrect = await user.passwordCheck(user.password, password);
  if (!isPasswordCorrect)
    return next(new AppError("Invalid user name or password", 404));
  const token = tokenGenerator(res, user._id);

  // const MAX_AGE = 60 * 60 * 24;
  // res.cookie("token", token, {
  //   // maxAge: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  //   expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: "None",
  // });

  res.status(200).json({
    status: "success",
    message: "you are logged in successfully",
    data: user,
    token,
  });
});

export const forgetPassword = asyncCatch(async (req, res, next) => {
  const { email } = req.body;
  if (!email)
    return next(new AppError("please provide your email address", 404));
  const user = await User.findOne({ email });
  if (!user)
    return next(new AppError("There is no email registered by this email"));

  const resetTokenUrl = await user.createResetToken();
  await user.save({ validateBeforeSave: true });
  const passwordResetUrl = `${req.protocol}:/${req.originalUrl}/${resetTokenUrl}`; // this url will sent via email

  //email sent logic here
  sendEmailMessage(passwordResetUrl, user, res);
});

export const resetPassword = asyncCatch(async (req, res, next) => {
  //decode reset token
  const resetToken = await crypto
    .createHash("sha256")
    .update(req.query.resetToken)
    .digest("hex");

  //find users by this token
  const user = await User.findOne({
    resetToken,
  }).select("+password");

  if (!req.body.confirmPassword || !req.body.password) {
    return next(new AppError("Password and Confirm password are required"));
  }

  if (req.body.confirmPassword !== req.body.password) {
    return next(new AppError("Password not much"));
  }

  if (!user) return next(new AppError("Invalid Token", 404));

  const isTokenExpired = await user.isTokenExpired();
  if (isTokenExpired) return next(new AppError("Token Expired", 404));

  //save new password to the database
  user.password = req.body.password;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  user.save({ validateBeforeSave: true });

  const token = tokenGenerator(res, user._id);

  res.status(201).json({
    status: "success",
    message: "Your password changed successfully",
    token,
  });
});

export const readProfileInfo = asyncCatch(async (req, res, next) => {
  // console.log(req.cookies,'cookies')
  const user = await User.findById(req.user._id).populate("user");

  res.status(200).json({
    status: "READ",
    data: user,
  });
});

export const updateProfileInfo = asyncCatch(async (req, res, next) => {
  const body = { ...req.body };

  const remove = [
    "role",
    "password",
    "confirmPassword",
    "permission",
    "profilePicture",
    "userType",
    "user",
  ];

  remove.forEach((el) => {
    if (body[el]) {
      delete body[el];
    }
  });

  const data = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: { ...body },
    }
  );

  if (!data)
    return next(new AppError("Error unable to update the profile", 404));

  res
    .status(200)
    .json({ status: "Updated", message: "Profile updated successfully" });
});

export const updateProfilePicture = asyncCatch(async (req, res, next) => {
  if (!req.files || !req.files.profilePicture)
    return next(new AppError("please select your new profile picture", 404));

  const data = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        profilePicture:
          "http://localhost:5000/uploads/" +
          req.files.profilePicture[0].filename,
      },
    }
  );

  if (!data)
    return next(new AppError("Error unable to update the profile", 404));

  return res.status(200).json({
    status: "Updated",
    message: "Profile picture updated successfully",
  });
});

export const updatePassword = asyncCatch(async (req, res, next) => {
  const { newPassword, currentPassword, confirmPassword } = req.body;

  if (!newPassword || !currentPassword || !confirmPassword)
    return next(new AppError("All fields are required", 404));

  const user = await User.findOne({ _id: req.user._id }).select("+password");

  if (newPassword !== confirmPassword)
    return next(new AppError("Password not much", 404));

  if (!user) return next(new AppError("Please login first to proceed", 404));

  //check current password
  const isPasswordCorrect = await user.passwordCheck(
    user.password,
    currentPassword
  );
  if (!isPasswordCorrect)
    return next(new AppError("Your current password is incorrect", 404));

  //save new password to the database
  user.password = newPassword;
  const data = await user.save({ validateBeforeSave: true });

  if (!data)
    return next(new AppError("Error unable to update the password", 404));

  res
    .status(200)
    .json({ status: "Changed", message: "Password changed successfully" });
});
