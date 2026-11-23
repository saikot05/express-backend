import type { Request, Response } from "express";
import { authService } from "./auth.service";


const loginUser = async(req: Request, res: Response) =>{

    try {
        const result = await authService.loginUserIntoDB(req.body);

        const {refreshToken} = result;

        res.cookie("refreshToken",refreshToken,{
            secure:false,
            httpOnly: true,
            sameSite:"lax",
            //maxAge:
            path:"/",
            domain: "localhost", // example.com
        })

        res.status(200).json({
            success: true,
            message: "User login successfully",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error,
        })
    }
}
const generateToken = async(req: Request, res: Response) =>{

    try {
        //console.log(req.cookies.refreshToken)
        const result = await authService.generateAccessToken(req.cookies.refreshToken);


        res.status(200).json({
            success: true,
            message: "Access token generated successfully",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error,
        })
    }
}

export const authController = {
    loginUser,
    generateToken
}