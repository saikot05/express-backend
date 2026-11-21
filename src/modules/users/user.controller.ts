import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser =  async(req: Request, res: Response) =>{
    try {
        const result = await userService.createUserIntoDB(req.body);

        res.status(201).json({
            success: true,
            message: "User created successfully!!",
            data: result.rows[0],
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error,
        })
    }
}

const getAllUsers = async(req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: "User retrieved successfully!!",
            data: result.rows,
        })
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error,
        });
    }
}

const getSingleUser = async(req:Request, res:Response)=>{
    try {
    const {id} = req.params;
    const result = await userService.getSingleUserFromDB(id as string);
    
    if(result.rowCount === 0){
            res.status(404).json({
                success: false,
                message: "User not found !!"
            })
    }

    res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: result.rows[0]
    })
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error,
        });
    }
}

const updateUser = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const result = await userService.updateUserFromDB(req.body, id as string)

        if(result.rowCount === 0){
            res.status(404).json({
                success: false,
                message: "User not found !!"
            })
        }

        res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0]
    })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error,
        });
    }
}

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
}