import express, { 
    type Application,
    type Request, 
    type Response
    }
    from 'express';
import config from './config';
import { pool } from './db';
import { userRoute } from './modules/users/user.route';
import { profileRouter } from './modules/profile/profile.route';
import { authRoute } from './modules/auth/auth.route';

const app : Application = express();
import fs from "fs"

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));


app.use((req, res, next) => {
    //console.log('Method-> URL -> Time:',req.method,req.url, Date.now());

    const log = `\nMethod : ${req.method} | URL : ${req.url} | Time : ${Date.now()}\n`;
    fs.appendFile("logger.txt", log,(err) => {
        console.log(err);
    })
    next();
});

app.use("/api/v1/users",userRoute);
app.use("/api/v1/profiles", profileRouter);
app.use("/api/v1/auth", authRoute)

app.get("/", (req: Request,res: Response) =>{
    res.status(200).json({
        success: true,
        message: "This is root route",
        author: "PH",
    })
});

export default app;