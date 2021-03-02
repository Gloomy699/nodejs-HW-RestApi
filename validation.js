const Joi = require("joi");

const schemaCreate = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(9).max(15).required(),
});

const schemaUpdate = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: Joi.string().min(9).max(15).optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message,
    });
  }
  next();
};

module.exports.createContact = (req, res, next) => {
  return validate(schemaCreate, req.body, next);
};

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdate, req.body, next);
};
