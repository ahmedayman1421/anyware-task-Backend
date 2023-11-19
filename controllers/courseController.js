import Course from "../models/course.js";
import APIFeatures from "../utils/ApiFeatures.js";
import catchAsync from "../utils/catchAsync.js";


export const getAllCourses = catchAsync(async (req, res, next) => {
  const {query} =new APIFeatures(Course.find() , req.query).sort().limitFields().filter()
  
  const count = await Course.countDocuments(query);
  const { query: query2 } = new APIFeatures(query, req.query).paginate();
  
const courses = await query2.populate({path:"instructor",ref:"User"})


  res.status(200).json({
    status: "success",
    count,
    data: courses,
  });
});


export const getCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId).populate({
    path: "instructor",
    ref: "User",
  });

  res.status(200).json({
    status: "success",
    data: course,
  });
});
