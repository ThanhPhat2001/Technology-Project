import Joi from "joi";

const createBrand = {
  body: Joi.object().keys({
    brand_name: Joi.string().required().max(100),
    description: Joi.string().max(500).optional().allow(""),
    slug: Joi.string().optional().allow(""),
  }),
};

const updateBrand = {
  body: Joi.object().keys({
    brand_name: Joi.string().required().max(100),
    description: Joi.string().max(500).optional().allow(""),
    slug: Joi.string().optional().allow(""),
  }),
};

export default {
  createBrand,
  updateBrand,
};
