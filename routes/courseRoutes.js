import express from "express";

import { getAllCourses, getCourse } from "../controllers/courseController.js";
import { protect } from "../controllers/authController.js";
import courseReviewRoute from "./courseReviewRoute.js";
import announcementRoutes from "./announcementRoutes.js";


const courseRoutes = express.Router();

courseRoutes.use(protect);

courseRoutes.route("/:courseId/review").get(courseReviewRoute);
courseRoutes.route("/:courseId/announcement").get(announcementRoutes);

courseRoutes.route("/").get(getAllCourses);
courseRoutes.route("/:courseId").get(getCourse);
// .post(restrictTo('admin', 'instructor') , createCourse)

export default courseRoutes;
