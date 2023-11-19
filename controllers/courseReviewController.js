import CourseReview from "../models/CourseReview.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import Course from "../models/course.js";

export const createCourseReview = catchAsync(async (req, res, next) => {
  req.body.course = req.body.course || req.params.courseId;
  req.body.user = req.body.user || req.user.id;

  const slectedCourse = await Course.findOne({
    _id: req.body.course,
    students: req.body.user,
  });

  if (!slectedCourse)
    return next(new AppError("Your don't have permession", 403));

  const review = await CourseReview.create(req.body);

  res.status(200).json({
    status: "success",
    data: review,
  });
});
