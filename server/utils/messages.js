const message = {
  emailOne: "billing@etblink.com",
  emailTwo: "info@etblink.com",
  emailThree: "security@etblink.com",
  boost: {
    subject: "Boost service added",
    message: "Your new service starts from",
    link: "https://etblink.com",
    button: "Explore More",
  },

  view: {
    subject: "Your Company is viewed by a new client",
    message:
      "Your Company is viewed by a new client, Click the link below to check who views your company",
    link: "https://etblink.com",
    button: "Explore More",
  },

  rate: {
    subject: "Your rating is updated",
    message:
      "Your Company is viewed by a new client, Click the link below to check who views your company",
    link: "https://etblink.com",
    button: "Explore More",
  },

  upgrade: {
    subject: "Your rating is updated",
    message:
      "Your Company is viewed by a new client, Click the link below to check who views your company",
    link: "https://etblink.com",
    button: "Explore More",
  },

  boost: {
    subject: "Your rating is updated",
    message:
      "Your Company is viewed by a new client, Click the link below to check who views your company",
    link: "https://etblink.com",
    button: "Explore More",
  },
};

const emails = (value) => {
  return {
    emailOne: "info@etblink.com",
    emailTwo: "billing@etblink.com",
    emailThree: "security@etblink.com",
  };
};

// upgrade
const upgradeSubject = (value) => {
  return ``;
};

const upgradeMessage = (value) => {
  //value=>{email,role}
  return `user upgrades his account from visitor to value.role`;
};

const upgradeLink = (value) => {
  return ``;
};

const upgradeButton = (value) => {
  return ``;
};

// rate
const rateSubject = (value) => {
  //value=>name
  return ``;
};

const rateMessage = (value) => {
  //value=>{name,message,value,type==='update' or 'create'}
  return `skylight technologies has been rated you`;
};

const rateLink = (value) => {
  //value=>link
  return ``;
};

const rateButton = (value) => {
  return ``;
};

// view
const viewSubject = (value) => {
  return ``;
};

const viewMessage = (value) => {
  // value=>email or New Client
  return ``;
};

const viewLink = (value) => {
  return ``;
};

const viewButton = (value) => {
  return ``;
};

// save
const saveSubject = (value) => {
  return ``;
};

const saveMessage = (value) => {
  // value=>email or New Client
  return `emanuel saves you`;
};

const saveLink = (value) => {
  return ``;
};

const saveButton = (value) => {
  return ``;
};

// boost
const boostSubject = (value) => {
  return ``;
};

const boostMessage = (value) => {
  // value=>{email,startDate,endDate,type}
  return `A new boosted plan has been added to ${
    value.type === "user" ? "your company" : value.email
  }. The boosting service will be available from ${new Date(
    value.startDate
  ).toDateString()} to ${new Date(value.endDate).toDateString()}. ${
    value.type === "user" ? "Thank you for working with us!" : "Thank you sir!"
  }`;
};

const boostLink = (value) => {
  return ``;
};

const boostButton = (value) => {
  return ``;
};

// service
const serviceSubject = (value) => {
  return ``;
};

const serviceMessage = (value) => {
  // value=>{email,startDate,endDate,type}
  return `A new service plan has been added to ${
    value.type === "user" ? "your company" : value.email
  }. The service will be available from ${new Date(
    value.startDate
  ).toDateString()} to ${new Date(value.endDate).toDateString()}. ${
    value.type === "user" ? "Thank you for working with us!" : "Thank you sir!"
  }`;
};

const serviceLink = (value) => {
  return ``;
};

const serviceButton = (value) => {
  return ``;
};

// fund
const fundSubject = (value) => {
  return ``;
};

const fundMessage = (value) => {
  //value=>{email,amount}
  return ``;
};

const fundLink = (value) => {
  return ``;
};

const fundButton = (value) => {
  return ``;
};

// approve
const approveSubject = (value) => {
  return ``;
};

const approveMessage = (value) => {
  //value={approvalType,actionType,value}
  const approveMsg = `Your ${value.approvalType} transaction has been ${
    value.value === true
      ? "Approved"
      : "Rejected please try again with the correct information"
  }. Thank you for working with us!`;

  const serviceMsg = `Your ${value.actionType} transaction has been ${
    value.value === true
      ? "Started"
      : "Canceled please contact our customer service"
  }. Thank you for working with us!`;

  return value.approvalType === "boosting" ||
    value.approvalType === "subscription" ||
    value.approvalType === "fund"
    ? approveMsg
    : serviceMsg;
};

const approveLink = (value) => {
  return ``;
};

const approveButton = (value) => {
  return ``;
};

// service start
const serviceStartSubject = (value) => {
  return ``;
};

const serviceStartMessage = (value) => {
  return ``;
};

const serviceStartLink = (value) => {
  return ``;
};

const serviceStartButton = (value) => {
  return ``;
};

// service canceled
const serviceCancelSubject = (value) => {
  return ``;
};

const serviceCancelMessage = (value) => {
  return ``;
};

const serviceCancelLink = (value) => {
  return ``;
};

const serviceCancelButton = (value) => {
  return ``;
};

//not yet subscribe
const notYetSubscribeSubject = (value) => {
  return ``;
};

const notYetSubscribeMessage = (value) => {
  return ``;
};

const notYetSubscribeLink = (value) => {
  return ``;
};

const notYetSubscribeButton = (value) => {
  return ``;
};

//not yet boost
const notYetBoostSubject = (value) => {
  return ``;
};

const notYetBoostMessage = (value) => {
  return ``;
};

const notYetBoostLink = (value) => {
  return ``;
};

const notYetBoostButton = (value) => {
  return ``;
};

//boost expired warning
const boostExpiredWarningSubject = (value) => {
  return ``;
};

const boostExpiredWarningMessage = (value) => {
  return ``;
};

const boostExpiredWarningLink = (value) => {
  return ``;
};

const boostExpiredWarningButton = (value) => {
  return ``;
};

//subscription expired warning
const subscriptionExpiredWarningSubject = (value) => {
  return ``;
};

const subscriptionExpiredWarningMessage = (value) => {
  return ``;
};

const subscriptionExpiredWarningLink = (value) => {
  return ``;
};

const subscriptionExpiredWarningButton = (value) => {
  return ``;
};

//boost expired
const boostExpiredSubject = (value) => {
  return ``;
};

const boostExpiredMessage = (value) => {
  return ``;
};

const boostExpiredLink = (value) => {
  return ``;
};

const boostExpiredButton = (value) => {
  return ``;
};

//subscription expired warning
const subscriptionExpiredSubject = (value) => {
  return ``;
};

const subscriptionExpiredMessage = (value) => {
  return ``;
};

const subscriptionExpiredLink = (value) => {
  return ``;
};

const subscriptionExpiredButton = (value) => {
  return ``;
};

// welcome
const welcomeSubject = (value) => {
  return ``;
};

const welcomeMessage = (value) => {
  return ``;
};

const welcomeLink = (value) => {
  return ``;
};

const welcomeButton = (value) => {
  return ``;
};

// reset
const resetSubject = (value) => {
  return ``;
};

const resetMessage = (value) => {
  return ``;
};

const resetLink = (value) => {
  return ``;
};

const resetButton = (value) => {
  return ``;
};

module.exports = {
  emails,
  upgradeSubject,
  upgradeMessage,
  upgradeLink,
  upgradeButton,
  rateSubject,
  rateMessage,
  rateLink,
  rateButton,
  viewSubject,
  viewMessage,
  viewLink,
  viewButton,
  saveSubject,
  saveMessage,
  saveLink,
  saveButton,
  boostSubject,
  boostMessage,
  boostLink,
  boostButton,
  serviceSubject,
  serviceMessage,
  serviceLink,
  serviceButton,
  fundSubject,
  fundMessage,
  fundLink,
  fundButton,
  approveSubject,
  approveMessage,
  approveLink,
  approveButton,
  serviceStartSubject,
  serviceStartMessage,
  serviceStartLink,
  serviceStartButton,
  serviceCancelSubject,
  serviceCancelMessage,
  serviceCancelLink,
  serviceCancelButton,
  notYetSubscribeSubject,
  notYetSubscribeMessage,
  notYetSubscribeLink,
  notYetSubscribeButton,
  notYetBoostSubject,
  notYetBoostMessage,
  notYetBoostLink,
  notYetBoostButton,
  boostExpiredWarningSubject,
  boostExpiredWarningMessage,
  boostExpiredWarningLink,
  boostExpiredWarningButton,
  subscriptionExpiredWarningSubject,
  subscriptionExpiredWarningMessage,
  subscriptionExpiredWarningLink,
  subscriptionExpiredWarningButton,
  boostExpiredSubject,
  boostExpiredMessage,
  boostExpiredLink,
  boostExpiredButton,
  subscriptionExpiredSubject,
  subscriptionExpiredMessage,
  subscriptionExpiredLink,
  subscriptionExpiredButton,
  welcomeSubject,
  welcomeMessage,
  welcomeLink,
  welcomeButton,
  resetSubject,
  resetMessage,
  resetLink,
  resetButton,
};
