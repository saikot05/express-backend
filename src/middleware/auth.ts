import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { pool } from "../db";

const auth = (...roles : any)=> {
  return async(req: Request, res: Response, next: NextFunction) => {
  //console.log(roles)
  //! 1-> Check if the token exist
  //! 2-> Verify token
  //! 3-> check if the user exists
  //! 4->  Is the user status active
  const token = req.headers.authorization;
  if(!token){
    res.status(401).json({
        success: false,
        message: "Unauthorized access!",
    })
  }

  const decode = jwt.verify(token as string, config.jwt_secret) as JwtPayload
  
  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [decode.email]
  )

  if(user.rowCount === 0){
    res.status(404).json({
        success: false,
        message: "User not found!",
    })
  }

  if(!user.rows[0].is_active){
    res.status(403).json({
        success: false,
        message: "Forbidden!",
    })
  }

  req.user = decode;
  
  next();
 };
}

export default auth;