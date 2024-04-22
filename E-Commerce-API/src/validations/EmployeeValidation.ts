import Joi from "joi";
import { passwordStrong } from "./custom.validation";

// Schema cho việc tạo một mục mới
const createEmployee = {
  body: Joi.object().keys({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().optional().allow(""),
    birthDay: Joi.date().optional().allow(""),
    password: Joi.custom(passwordStrong).required(),
    avatar: Joi.string().optional().allow(""),
    role: Joi.string().optional().allow(""),
    active: Joi.boolean(),
  }),
};

// Schema cho việc cập nhật một mục
const updateEmployee = {
  body: Joi.object().keys({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().optional().allow(""),
    birthDay: Joi.date().optional().allow(""),
    password: Joi.custom(passwordStrong).required(),
    avatar: Joi.string().optional().allow(""),
    role: Joi.string().optional().allow(""),
    active: Joi.boolean(),
  }),
};

export default {
  createEmployee,
  updateEmployee,
};
