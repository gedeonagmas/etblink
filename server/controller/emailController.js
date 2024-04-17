import AppError from "../utils/AppError.js";
import nodemailer from "nodemailer";

export const sendEmailHandler = (
  email,
  res,
  next,
  subject,
  message,
  html,
  from,
  response,
  to
) => {
  const transporter = nodemailer.createTransport({
    host: "mail.makutalawyers.com",
    port: 465,
    secure: true,
    auth: {
      user: "donotreply@makutalawyers.com",
      pass: "Maku@Mesy#2098",
    },
  });

  const mailOptions = {
    from: from ? from : "Makuta Law Firm <donotreply@makutalawyers.com>",
    to: email ? email : to,
    text: message,
    subject: subject,
    html: html ? html : null,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error in sending email  " + error); 
      return next(
        new AppError(
          "Connection problem unable to send the email please try again!",
          500
        )
      );
    } else {
      return res.status(200).json({ message: response });
    }
  });
};
