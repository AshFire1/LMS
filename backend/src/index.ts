import express, { Request,Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./database/dbConnect";
import userRoute from "./routes/user.route"
import cors from "cors";
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

dotenv.config({});
connectDB();
let PORT=process.env.PORT||3000;
app.use("/api/v1/user",userRoute);

app.get("/home",(_:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        message:"Hellasdo imzsz backend"
    })
})

app.listen(PORT,()=>{
    console.log(`Server Listen At Port ${PORT}`);
})