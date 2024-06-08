const AppError = require("../utils/AppError");
const nodemailer = require("nodemailer");
const { emailTemplate } = require("../utils/emailTemplate");

const sendEmailHandler = ({
  subject,
  message,
  to,
  from,
  response,
  res,
  next,
  button,
  link,
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
    from: from
      ? from
      : "Ethiopian Business Link <donotreply@makutalawyers.com>",
    to: email ? email : to,
    subject: subject,
    html: emailTemplate({ subject, message, button, link }),
  };

  return console.log("email sent");
  // return transporter.sendMail(mailOptions, function (error, info) {
  //   console.log(info, "info");
  //   if (error) {
  //     console.log("Error in sending email  " + error);
  //     if (next)
  //       return next(
  //         new AppError(
  //           "Something went wrong unable to send the email, check your connection and email then try again!",
  //           500
  //         )
  //       );
  //   } else if (res && response) {
  //     console.log("email sent successfully from response");
  //     return res.status(200).json({ message: response });
  //   } else {
  //     console.log("email sent successfully");
  //     return;
  //   }
  // });
};

module.exports = { sendEmailHandler };
