import Joi from "joi";

const loginValidationScheme = Joi.object<any>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
});

export default loginValidationScheme;