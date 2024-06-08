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
    emailOne: "billing@etblink.com",
    emailTwo: "info@etblink.com",
    emailThree: "security@etblink.com",
  };
};

const rate = (value) => {
  return { subject: ``, message: ``, link: ``, button: `` };
};

const view = (value) => {
  return { subject: ``, message: ``, link: ``, button: `` };
};

const save = (value) => {
  return { subject: ``, message: ``, link: ``, button: `` };
};

const upgrade = (value) => {
  return { subject: ``, message: ``, link: ``, button: `` };
};

const boost = (value) => {
  return { subject: ``, message: ``, link: ``, button: `` };
};

const service = (value) => {
  return { subject: ``, message: ``, link: ``, button: `` };
};

const fund = (value) => {
  return { subject: ``, message: ``, link: ``, button: `` };
};

const approve = (value) => {
  return { subject: ``, message: ``, link: ``, button: `` };
};

const start = (value) => {
  return { subject: ``, message: ``, link: ``, button: `` };
};

module.exports = {
  emails,
  rate,
  view,
  save,
  upgrade,
  boost,
  service,
  fund,
  approve,
  start,
};
