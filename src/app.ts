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
import logger from './middleware/logger';
import globalErrorHandler from './middleware/globalErrorHandler';

const app : Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
app.use(logger);

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

app.use(globalErrorHandler);

export default app;