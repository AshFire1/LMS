import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
const isAuthenticated =async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const token=req.cookies.token;
        if(!token){
            res.status(401).json({
                message:"User not authenticated",
                sucess:false
            })
        }
        if(!process.env.SECRET_KEY){
            return ;
        }
        const decode= jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            res.status(401).json({
                message:"Invalid Token",
                success:false
            })
            return ;
        }   
        //@ts-ignore
        req.id=decode.userId
        next();
        
    }catch(e)
    {
        console.log(e);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
    return ;
}
 
export default isAuthenticated;