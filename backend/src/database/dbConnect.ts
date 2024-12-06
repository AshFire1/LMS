import mongoose from "mongoose";


const connectDB=async()=>{
    try{
        if (typeof process.env.MONGO_URI === "undefined") {
            console.error("Error: MONGO_URI is undefined. Exiting...");
            return;
          }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected");

    }catch(e){
        console.log("Error: ",e);
    }
}

export default connectDB;