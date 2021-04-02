const Joi = require('joi');
const { StatusCode } = require('../../../helpers/constants');

const schemaCreateUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().min(8).required(),
});

const schemaUpdateUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  password: Joi.string().min(8).optional(),
  subscription: Joi.string().optional(),
});

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.alternatives()
    .try(
      Joi.string().valid('free'),
      Joi.string().valid('pro'),
      Joi.string().valid('premium'),
    )
    .required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: StatusCode.BAD_REQUEST,
      message: `Bad request: ${message.replace(/"/g, '')}`,
    });
  }
  next();
};

module.exports.createUser = (req, _res, next) => {
  validate(schemaCreateUser, req.body, next);
};

module.exports.loginUser = (req, _res, next) => {
  validate(schemaLoginUser, req.body, next);
};

module.exports.updateUser = (req, _res, next) => {
  validate(schemaUpdateUser, req.body, next);
};

module.exports.updateSubscription = (req, _res, next) => {
  validate(schemaUpdateSubscription, req.body, next);
};