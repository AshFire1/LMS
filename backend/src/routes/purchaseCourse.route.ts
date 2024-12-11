import express from "express"
import isAuthenticated from "../middleware/isAuthenticated";
import { createCheckoutSession, getAllPurchasedCourses, getCourseDetailWithPurchaseStatus, stripeWebhook } from "../controllers/coursePurchase.controller";
const router=express.Router();
router.route("/checkout-create-checkout-session").post(isAuthenticated,createCheckoutSession);
router.route("/webhook").post(express.raw({type:"application/json"}),stripeWebhook);
router.route("/course/:courseId/details-with-status").get(isAuthenticated,getCourseDetailWithPurchaseStatus);
 
router.route("/").get(getAllPurchasedCourses);
export default router;