import express from "express";

import { createCourseReview } from "../controllers/courseReviewController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const courseReviewRoute = express.Router({ mergeParams: true });

courseReviewRoute.use(protect);

courseReviewRoute.route("/").post(restrictTo("student"), createCourseReview);

export default courseReviewRoute;
