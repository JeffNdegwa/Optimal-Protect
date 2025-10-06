// backend/validation/orderSchema.js
import Joi from "joi";

export const orderSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).max(20).required(),
  address: Joi.string().min(5).max(1000).required(),
  cart: Joi.array().items(
    Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number().positive().required(),
      qty: Joi.number().integer().min(1).required(),
      stock: Joi.number().integer().min(0).required(),
    })
  ).min(1).required(),
  cartTotal: Joi.number().positive().required(),
});
