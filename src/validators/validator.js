const Joi = require("joi");
const response = require("../helpers/response.js");

const validate = (req, res, next, joiSchema) => {
   const schema = Joi.object().keys(joiSchema);

   const { error } = schema.validate(req.body, {
      abortEarly: true,
      convert: true,
      allowUnknown: false,
   });

   if (error)
      return response.error(
         req,
         res,
         error.details[0].message,
         response.API_STATUS.API_SUCCESS,
         error
      );

   next();
};

module.exports = validate;
