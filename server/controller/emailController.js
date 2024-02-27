import asyncCatch from "express-async-catch";
import sendEmail from "../utils/nodeMailer.js";
import AppError from "../utils/AppError.js";

export const sendEmailController = asyncCatch(async (req, res, next) => {
  //   try {
  const data = await sendEmail({
    from: "JMS <gymate@gmail.com>",
    email: "gedeonagmas2580@gmail.com",
    subject: `new email received from JMS sender: ${req.body.fullName} email: ${req.body.email}`,
    message: req.body.description,
  });

  if (!data) {
    return next(new AppError("Something went wrong, Email not sent", 400));
  }

  return res.status(200).json({
    status: "SENT",
    message: "Email Sent Successfully. We Really Appreciate for your Support",
  });
  //   } catch (err) {
  //     return next(new AppError("connection problem please try again", 500));
  //   }
});

export const sendEmailMessage = async (passwordResetUrl, user, res) => {
  try {
    await sendEmail({
      from: "alphaalpha@gmail.com",
      email: user.email,
      subject: "reset your password",
      message: "verify your email to reset your password",
      html: `<div>this is your verification link click <a style={{background:'#00aeff',color:white,padding:10px;}} href="${passwordResetUrl}">here</a> to reset your password</div>`,
    });
    return res.status(200).json({
      status: "success",
      message:
        "We have just sent a verification link via your email address please check. it's valid only for 10 minutes",
      passwordResetUrl,
    });
  } catch (err) {
    console.log(err);
    user.resetTokenExpires = undefined;
    user.resetToken = undefined;
    user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "something went wrong Unable to send the email please try again",
        500
      )
    );
  }
};
