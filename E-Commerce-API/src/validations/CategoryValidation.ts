import Joi from "joi";

const createCategory = {
  body: Joi.object().keys({
    category_name: Joi.string().required(),
    description: Joi.string().max(500).optional().allow(""),
    slug: Joi.string().optional().allow(""),
  }),
};

const updateCategory = {
  body: Joi.object().keys({
    category_name: Joi.string().required(),
    description: Joi.string().max(500).optional().allow(""),
    slug: Joi.string().optional().allow(""),
  }),
};

export default {
  createCategory,
  updateCategory,
};
