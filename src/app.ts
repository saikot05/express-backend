import express, { 
    type Application,
    type Request, 
    type Response
    }
    from 'express';
import config from './config';
import { pool } from './db';
import { userRoute } from './modules/users/user.route';

const app : Application = express();


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));



app.get("/", (req: Request,res: Response) =>{
    //console.log(req);
    //res.send("This is root route");
    res.status(200).json({
        success: true,
        message: "This is root route",
        author: "PH",
    })
});

app.use("/api/v1/users",userRoute)



app.delete("/api/v1/users/:id", async(req: Request, res:Response) => {
    try {
        const {id} = req.params;
        const result = await pool.query(
            `
            DELETE FROM users WHERE id = $1   
            `,
            [id]
        );
        //console.log(result);
        if(result.rowCount === 0){
            res.status(404).json({
                success: false,
                message: "User not found !!"
            })
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        })
    }
})

export default app;