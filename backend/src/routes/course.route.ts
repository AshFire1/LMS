import express from "express";
import isAuthenticated from "../middleware/isAuthenticated";
import { createCourse, createLecture, editCourse, editLecture, getAllCreatorCourses, getCourseById, getCourseLecture, getLectureById, getPublishedCourse, removeCourse, removeLecture, searchCourse, tooglePublishCourse } from "../controllers/course.controller";
import upload from "../utils/multer";

const router=express.Router();

router.route("/search").get(isAuthenticated, searchCourse);
router.route("/").post(isAuthenticated,createCourse);
router.route("/").get(getAllCreatorCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse);
router.route("/:courseId").get(isAuthenticated,getCourseById);
router.route("/:courseId").delete(isAuthenticated,removeCourse);
router.route("/course/published-courses").get(isAuthenticated,getPublishedCourse);
router.route("/:courseId/lecture").post(isAuthenticated,createLecture);
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated,editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated,removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated,getLectureById);
router.route("/:courseId").patch(isAuthenticated,tooglePublishCourse);
export default router;