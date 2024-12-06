import { Request,Response } from "express"
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

import { generateToken } from "../utils/generateToken";
export const register=async(req:Request,res:Response):Promise<void>=>{
    try{
        const{name,email,password}=req.body;
        if(!name || !email || !password){
             res.status(400).json({
                success:false,
                message:"All fields are required."
            })
            return ;
        }
        const user=await User.findOne({email});
        if(user){
             res.status(400).json({
                success:false,
                message:"User Already Exist with this email."
            })
            return ;
        }
        const hashedPassword=await bcrypt.hash(password,10);

        await User.create({
            name,
            email,
            password:hashedPassword
        });
        res.status(201).json({
            success:true,
            message:"Account Created successfully."
        })
    }catch(e){
        res.status(500).json({
            success:false,
            message:"Failed To register"
        })
    }
}

export const login=async (req:Request,res:Response):Promise<void>=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            res.status(400).json({
                success:false,
                message:"All fields are required."
            })
            return ;
        }
        const user =await User.findOne({email});
        if(!user){
            res.status(400).json({
                success:false,
                message:'Incorrect Email or password'
            })
            return ;
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            res.status(400).json({
                success:false,
                message:'Incorrect Email or password'
            })
            return ;
        }
        generateToken(res,user,`Welcome back ${user.name}`);
    }catch(e){
         res.status(500).json({
            success:false,
            message:"Failed To register"
        })
        return ;

    }

}