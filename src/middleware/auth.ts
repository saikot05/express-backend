import type { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  console.log("This is protected route!");
  next();
};

export default auth;