import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";

const loginUserIntoDB = async(payload: {email: string; password: string})=>{
    //? 1.check if the user exist
    //? 2.check if the password match
    //? 3.check the user status
    //? 4.If pass all then generate jwt token

    const {email,password} = payload
    const user = await pool.query(
        `
        SELECT * FROM users WHERE email=$1
        `,
        [email],
    );
    
    const matchPassword = await bcrypt.compare(password,user.rows[0].password)

    if(!matchPassword){
        throw new Error("Invalid credentials!!");
    }

    if(!user.rows[0].is_active){
        throw new Error("Access denied!!");
    }

    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
    }

    const accessToken = jwt.sign(jwtPayload, "sakfjaflaflaja", {expiresIn: "1d",});

    return {accessToken, user: user.rows[0]};
}

export const authService = {
    loginUserIntoDB,
}