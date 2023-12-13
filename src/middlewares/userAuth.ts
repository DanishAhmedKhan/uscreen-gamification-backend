import jwt from "jsonwebtoken";
import response from "../helpers/response";
import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
   const token = req.header("x-auth-token");

   if (!token) return res.status(401).send("Access denied. No token provided.");

   try {
      const privateKey = process.env.JWT_SECRET_KEY;
      const decoded = jwt.verify(token, privateKey);

      req["user"] = decoded;
      next();
   } catch (e) {
      response.error(req, res, "Invalid token.", 401);
   }
};
