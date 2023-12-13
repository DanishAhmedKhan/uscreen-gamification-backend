import Joi from "joi";
import validate from "./validator";
import { NextFunction, Request, Response } from "express";

export const loginUserValidator = (req: Request, res: Response, next: NextFunction) =>
   validate(req, res, next, {
      platform: Joi.string().required(),
      userId: Joi.string().required(),
      productId: Joi.string().required(),
   });

export const addUserValidator = (req: Request, res: Response, next: NextFunction) =>
   validate(req, res, next, {
      platform: Joi.string().required(),
      userId: Joi.string().required(),
      productId: Joi.string().required(),
   });

export const addDataValidator = (req: Request, res: Response, next: NextFunction) =>
   validate(req, res, next, {
      data: Joi.object().unknown().required(),
   });

export const getLeaderboardValidator = (req: Request, res: Response, next?: NextFunction) => {
   validate(req, res, next, {
      productId: Joi.string().required(),
   });
};
