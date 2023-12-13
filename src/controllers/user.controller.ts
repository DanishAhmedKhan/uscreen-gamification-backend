import User from "../models/User";
import response from "../helpers/response";
// Types
import { Request, Response } from "express";
import { IAuthenticatedRequest } from "../@types/user";

export const loginUserController = async (req: Request, res: Response) => {
   const { userId, productId, platform } = req.body;
   const user = await User.findOne({ userId, productId, platform });

   if (!user) await addUserController(req, res);

   let authToken = user?.generateAuthToken();
   res.setHeader("x-auth-token", authToken);

   response.success(req, res, {
      id: user._id,
      "x-auth-token": authToken,
   });
};

export const addUserController = async (req: Request, res: Response) => {
   let { platform, userId, productId } = req.body;

   let user = await User.findOne({ platform, userId, productId });
   if (user)
      return response.error(req, res, "User already added.", response.API_STATUS.BAD_REQUEST);

   user = { userId, productId, platform };
   user = new User(user);
   await user.save();

   let authToken = user.generateAuthToken();
   res.setHeader("x-auth-token", authToken);

   response.success(req, res, {
      id: user._id,
      "x-auth-token": authToken,
   });
};

export const addDataController = async (req: IAuthenticatedRequest, res: Response) => {
   let user = await User.findOne({ _id: req.user._id });
   user.data = {
      ...user.data,
      ...(req.body.data as object),
   };
   await user.save();

   response.success(req, res, "User data added");
};

export const getDataController = async (req: IAuthenticatedRequest, res: Response) => {
   let user = await User.findOne({ _id: req.user._id });

   response.success(req, res, {
      data: user.data,
   });
};

export const getLeaderboardController = async (req: Request, res: Response) => {
   let user = await User.find({ productId: req.body.productId })
      .sort({ "data.point": -1 })
      .limit(10);

   response.success(req, res, {
      data: user,
   });
};
