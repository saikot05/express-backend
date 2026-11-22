import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import config from "../config";

const auth = (req: Request, res: Response, next: NextFunction) => {
  //console.log("This is protected route!");
  //console.log(req.headers.authorization)
  //! 1-> Check if the token exist
  const token = req.headers.authorization;
  if(!token){
    res.status(401).json({
        success: false,
        message: "Unauthorized access!",
    })
  }

  const decode = jwt.verify(token as string, config.jwt_secret)

  next();
};

export default auth;