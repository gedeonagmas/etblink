import AppError from "../utils/AppError.js";
import nodemailer from "nodemailer";

export const sendEmailHandler = ({
  subject,
  message,
  to,
  from,
  response,
  res,
  next,
  html,
  email,
}) => {
  const transporter = nodemailer.createTransport({
    host: "mail.etblink.com",
    port: 465,
    secure: true,
    auth: {
      user: "billing@etblink.com",
      pass: "12345@Etblink",
    },
  });

  const mailOptions = {
    from: from ? from : "Makuta Law Firm <donotreply@makutalawyers.com>",
    to: email ? email : to,
    text: message,
    subject: subject,
    html: html ? html : null,
  };

  return transporter.sendMail(mailOptions, function (error, info) {
    // console.log(info, "info");
    if (error && next) {
      console.log("Error in sending email  " + error);
      return next(
        new AppError(
          "Something went wrong unable to send the email, check your connection and email then try again!",
          500
        )
      );
    } else if (res) {
      return res.status(200).json({ message: response });
    } else {
      console.log("email sent successfully");
      return;
    }
  });
};

// import AppError from "../utils/AppError.js";
// import nodemailer from "nodemailer";
// import path from "path";
// import hbs from "nodemailer-express-handlebars";

// export const sendEmailHandler = ({
//   subject,
//   message,
//   to,
//   from,
//   response,
//   res,
//   next,
//   html,
//   email,
// }) => {
//   const transporter = nodemailer.createTransport({
//     host: "mail.etblink.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "billing@etblink.com",
//       pass: "12345@Etblink",
//     },
//   });

//   const handlebarOptions = {
//     viewEngine: {
//       extName: ".handlebars",
//       partialsDir: path.resolve("./views"),
//       defaultLayout: false,
//     },
//     viewPath: path.resolve("./views"),
//     extName: ".handlebars",
//   };

//   transporter.use("compile", hbs(handlebarOptions));

//   const mailOptions = {
//     from: from ? from : "Makuta Law Firm <donotreply@makutalawyers.com>",
//     to: email ? email : to,
//     text: message,
//     subject: subject,
//     template: "email",
//     // html: html ? html : null,
//     context: {
//       title: "This is the title",
//       message: "this is the description",
//     },
//   };

//   return transporter.sendMail(mailOptions, function (error, info) {
//     // console.log(info, "info");
//     if (error && next) {
//       console.log("Error in sending email  " + error);
//       return next(
//         new AppError(
//           "Something went wrong unable to send the email, check your connection and email then try again!",
//           500
//         )
//       );
//     } else if (res) {
//       return res.status(200).json({ message: response });
//     } else {
//       console.log("email sent successfully");
//       return;
//     }
//   });
// };
