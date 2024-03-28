export const name = (field) => {
  return {
    validator: function (v) {
      return /^(?=.{3,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(v);
    },
    message: `${field} must contain only character and must be between 3 and 50 character`,
  };
};

export const gender = (field) => {
  return {
    validator: function (v) {
      return /^(?:male|female)$/gim.test(v);
    },
    message: `${field} must must be either male or female`,
  };
};

export const userName = (field) => {
  return {
    validator: function (v) {
      return /^[a-z0-9_.]+$/.test(v);
    },
    message: `${field} can only contains letters, numbers, underscores, and periods.`,
  };
};

export const email = (field) => {
  return {
    validator: function (v) {
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
    },
    message: `Invalid email`,
  };
};

export const password = (field) => {
  return {
    validator: function (v) {
      return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&? "])[a-zA-Z0-9!#$@^%&.?]{8,20}$/.test(
        v
      );
    },
    message: `${field} must have a minimum of 8 characters,
      maximum of 20 characters,
      at least one uppercase character,
      at least one lowercase character,
      at least one digit and 
      at least one special character`,
  };
};

export const confirmPassword = (field) => {
  return {
    validator: function (v) {
      return v === this.password;
    },
    message: `password not match`,
  };
};

export const date = (field) => {
  return {
    validator: function (v) {
      return /^((?=\d{4})\d{4}|(?=[a-zA-Z]{3})[a-zA-Z]{3}|\d{2})((?=\/)\/|\-)((?=[0-9]{2})[0-9]{2}|(?=[0-9]{1,2})[0-9]{1,2}|[a-zA-Z]{3})((?=\/)\/|\-)((?=[0-9]{4})[0-9]{4}|(?=[0-9]{2})[0-9]{2}|[a-zA-Z]{3})$/g.test(
        v
      );
    },
    message: `Invalid date`,
  };
};

export const paragraph = (field, min, max) => {
  return {
    validator: function (v) {
      console.log(v, "value");
      return v.toString().length < max && v.toString().length > min;
    },
    message: `${field} must between ${min} and ${max} characters`,
  };
};

export const numberLower = (field, min) => {
  return {
    validator: function (v) {
      return v > min;
    },
    message: `${field} must be greater than ${min}`,
  };
};

export const numberUpper = (field, max) => {
  return {
    validator: function (v) {
      return v < max;
    },
    message: `${field} must be less than ${max}`,
  };
};

export const numberBetween = (field, min, max) => {
  return {
    validator: function (v) {
      return v > min && v <= max;
    },
    message: `${field} must be between ${min} and ${max}`,
  };
};

export const phone = (field) => {
  return {
    validator: function (v) {
      return /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm.test(
        v
      );
    },
    message: `invalid phone number`,
  };
};

export const required = (field) => {
  return {
    validator: function (v) {
      return v.toString().length > 0;
    },
    message: `${field} is required`,
  };
};
