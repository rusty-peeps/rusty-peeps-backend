import Joi from "@hapi/joi";
import joiObjectId from "joi-objectid";
Joi.objectId = joiObjectId(Joi);

export const createOrder = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const verifyCapture = (req, res, next) => {
  const schema = Joi.object({
    razorpay_order_id: Joi.string().required(),
    razorpay_payment_id: Joi.string().required(),
    razorpay_signature: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const createSlot = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    dateTime: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    price: Joi.number().required(),
    courseId: Joi.string().required(),
    platform: Joi.string().required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    paymentId: Joi.string(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const createContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    message: Joi.string().required(),
    agree: Joi.boolean().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const createAdmissions = (req, res, next) => {
  const schema = Joi.object({
    institution_name: Joi.string().required(),
    contact_person: Joi.string().required(),
    destination_role: Joi.string().required(),
    phone_number: Joi.string().required(),
    email_address: Joi.string().email().required(),
    selected_course: Joi.string().required(),
    start_date: Joi.string().required(),
    number_of_participants: Joi.number().required(),
    additional_support: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const createNewsletter = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
