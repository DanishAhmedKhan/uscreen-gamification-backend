import { NextFunction, Request, Response } from "express";

type THandler<RT> = (req: Request | RT, res: Response) => Promise<void>;

export default <RT>(handler: THandler<RT>) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         await handler(req, res);
      } catch (err) {
         next(err);
      }
   };
};
