// Validation
const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = usr => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(6)
      .max(16)
      .required(),

    password: Joi.string()
      .min(6)
      .max(1024)
      .required(),
    confirm_password: Joi.string()
      .min(6)
      .max(1024)
      .required(),

    email: Joi.string()
      .email()
      .required()
  });
  return schema.validate(usr);
};

// Login Navigation
const loginValidation = usr => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(6)
      .max(16)
      .required(),

    password: Joi.string()
      .min(6)
      .max(1024)
      .required()
  });
  return schema.validate(usr);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
