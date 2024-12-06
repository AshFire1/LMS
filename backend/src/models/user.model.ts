 import mongoose, { Mongoose } from "mongoose";

export interface User{
    _id:mongoose.Types.ObjectId,
    name?:String,
    email?:String,
    password?:String
}
 const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["instructor","student"],
        default:'student'
    },
    enrolledCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    photoUrl:{
        type:String,
        default:""
    }
 },{timestamps:true});


 export const User=mongoose.model("User",userSchema)