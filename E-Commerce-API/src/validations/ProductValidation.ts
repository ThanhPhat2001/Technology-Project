import Joi from "joi";

const createProduct = {
  body: Joi.object().keys({
    product_name: Joi.string().max(225).required(),
    slug: Joi.string().max(225).optional().allow(""),
    price: Joi.number().required(),
    discount: Joi.number().optional().allow(""),
    categoryId: Joi.string().required(),
    brandId: Joi.string().required(),
    description: Joi.string().optional().allow(""),
    stock: Joi.number().optional().allow(""),
    thumbnail: Joi.array().optional().allow(""),
  }),
};

const updateProduct = {
  body: Joi.object().keys({
    product_name: Joi.string().max(225).required(),
    slug: Joi.string().max(225).optional().allow(""),
    price: Joi.number().required(),
    discount: Joi.number().optional().allow(""),
    categoryId: Joi.string().required(),
    brandId: Joi.string().required(),
    description: Joi.string().optional().allow(""),
    stock: Joi.number().optional().allow(""),
    thumbnail: Joi.array().optional().allow(""),
  }),
};

export default {
  createProduct,
  updateProduct,
};
