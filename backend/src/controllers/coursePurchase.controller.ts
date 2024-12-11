import Stripe from "stripe";
import { Request,Response } from "express";
import { Course } from "../models/course.model";
import { CoursePurchase } from "../models/coursePurchase.mode";
import { Lecture } from "../models/lectures.mode";
import { User } from "../models/user.model";
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY|| "");


export const createCheckoutSession=async(req:Request,res:Response):Promise<void>=>{
    try{
        //@ts-ignore 
        let userId=req.id;
        let {courseId}=req.body;
        const course=await Course.findById(courseId);
        if(!course){
            res.status(400).json({
                message:"Course not found"
            })
            return ;
        }
        //Create a new course purchase record 
        const newPurchase=new CoursePurchase({
            courseId:courseId,
            userId:userId,
            amount:course.coursePrice,
            status:"pending"
        });
        //create a stripe checkout session
        if(typeof course.coursePrice==="undefined")return ;
        if(!course.coursePrice)return ;

        //@ts-ignore
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
              {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: course.courseTitle,
                    images: [course.courseThumbnail],
                  },
                  unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: `http://localhost:5173/course-progress/${courseId}`, // once payment successful redirect to course progress page
            cancel_url: `http://localhost:5173/course-detail/${courseId}`,
            metadata: {
              courseId: courseId,
              userId: userId,
            },
            shipping_address_collection: {
              allowed_countries: ["IN"], // Optionally restrict allowed countries
            },
          });
      
          if (!session.url) {
             res
              .status(400)
              .json({ success: false, message: "Error while creating session" });
              return ;
          }
      
          // Save the purchase record
          newPurchase.paymentId = session.id;
          await newPurchase.save();
      
        res.status(200).json({
            success: true,
            url: session.url, // Return the Stripe checkout URL
          });

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Session could not be created"
        })
    }
    return ;
}
export const stripeWebhook = async (req:Request, res:Response):Promise<void> => {
    let event;
  
    try {
      const payloadString = JSON.stringify(req.body, null, 2);
      const secret = process.env.WEBHOOK_ENDPOINT_SECRET ||"";
  
      const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
      });
  
      event = stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error) {
        //@ts-ignore
        console.error("Webhook error:", error.message);
        //@ts-ignore
        res.status(400).send(`Webhook error: ${error.message}`);
        return
    }
  
    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
      console.log("check session complete is called");
  
      try {
        const session = event.data.object;
  
        const purchase = await CoursePurchase.findOne({
          paymentId: session.id,
        }).populate({ path: "courseId" });
  
        if (!purchase) {
            res.status(404).json({ message: "Purchase not found" });
            return
        }
  
        if (session.amount_total) {
          purchase.amount = session.amount_total / 100;
        }
        purchase.status = "completed";
  
        // Make all lectures visible by setting `isPreviewFree` to true
        //@ts-ignore
        if (purchase.courseId && purchase.courseId.lectures.length > 0) {
          await Lecture.updateMany(
            //@ts-ignore
            { _id: { $in: purchase.courseId.lectures } },
            { $set: { isPreviewFree: true } }
          );
        }
  
        await purchase.save();
  
        // Update user's enrolledCourses
        await User.findByIdAndUpdate(
          purchase.userId,
          { $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
          { new: true }
        );
  
        // Update course to add user ID to enrolledStudents
        await Course.findByIdAndUpdate(
          purchase.courseId._id,
          { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
          { new: true }
        );
      } catch (error) {
        console.error("Error handling event:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return ;
      }
    }
    res.status(200).send();
  };


  export const getCourseDetailWithPurchaseStatus=async(req:Request,res:Response):Promise<void>=>{
    try{
        const {courseId}=req.params;
        //@ts-ignore
        const userId=req.id;
        const course=await Course.findById(courseId).populate({path:"creator"}).populate({path:"lectures"});
        const purchased=await CoursePurchase.findOne({userId,courseId});
        if(!course){
            res.status(404).json({
                message:"Course Not Found"
            })
            return ;
        }
        res.status(200).json({
            course,
            purchased:purchased?true:false
        })

    }catch(e){
        console.log(e);
         

    }
  }

  export const getAllPurchasedCourses=async(req:Request,res:Response):Promise<void>=>{
    try{
        const purchasedCourses=await CoursePurchase.find({status:"completed"}).populate("courseId");
        if(!purchasedCourses){
            res.status(404).json({
                purchasedCourses:[]
            })
            return ;
        }
        res.status(200).json({
            purchasedCourse:purchasedCourses 
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Cannot fetch all purchased courses"
        })
    }
    return ;
  }