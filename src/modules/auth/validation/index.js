const Joi = require("joi");

const registrationValidationSchema = Joi.object({
  email: Joi.string().min(5).required(),
  password: Joi.string().pattern(
    new RegExp("^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,30}$")
  ),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
});

const loginValidationSchema = Joi.object({
  email: Joi.string().min(5).required(),
  password: Joi.string().pattern(
    new RegExp("^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,30}$")
  ),
});

module.exports = {
  registrationValidationSchema,
  loginValidationSchema,
};
