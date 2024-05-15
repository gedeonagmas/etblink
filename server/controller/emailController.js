const AppError = require("../utils/AppError");
const nodemailer = require("nodemailer");

const sendEmailHandler = ({
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

module.exports = { sendEmailHandler };
