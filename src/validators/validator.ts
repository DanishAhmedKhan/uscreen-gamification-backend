import Joi, { PartialSchemaMap, Schema } from "joi";
import response from "../helpers/response";
import { NextFunction, Request, Response } from "express";

const validate = (
   req: Request,
   res: Response,
   next?: NextFunction,
   joiSchema?: PartialSchemaMap<unknown>
) => {
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

export default validate;
