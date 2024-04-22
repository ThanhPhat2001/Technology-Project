import Joi from "joi";
import { passwordStrong } from "./custom.validation";

const createCustomer = {
  body: Joi.object().keys({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    street: Joi.string().optional().required(),
    city: Joi.string().optional().required(),
    state: Joi.string().optional().required(),
    birthDay: Joi.date().optional().allow(""),
    password: Joi.custom(passwordStrong).required(),
    avatar: Joi.string().optional().allow(""),
    zip_code: Joi.string().optional().allow(""),
  }),
};

const updateCustomer = {
  body: Joi.object().keys({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    street: Joi.string().optional().required(),
    city: Joi.string().optional().required(),
    state: Joi.string().optional().required(),
    birthDay: Joi.date().optional().allow(""),
    password: Joi.custom(passwordStrong).required(),
    avatar: Joi.string().optional().allow(""),
    zip_code: Joi.string().optional().allow(""),
  }),
};

export default {
  createCustomer,
  updateCustomer,
};
