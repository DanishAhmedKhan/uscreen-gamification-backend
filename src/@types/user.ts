export interface IUser {
   _id: string;
}

export interface IAuthenticatedRequest extends IUser {
   user: IUser;
   body: {
      [key: string]: unknown;
   };
}
