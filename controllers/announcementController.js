import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import Course from "../models/course.js";
import Announcement from "../models/announcement.js";

export const createAnnouncement = catchAsync(async (req, res, next) => {
  const courseId = req.body.course || req.params.courseId;
  const userId = req.body.author || req.user.id;

  const isTheInstructor = await Course.findOne({
    _id: courseId,
    instructor: userId,
  });

  if (!isTheInstructor)
    return next(new AppError("Your don't have permession", 403));

  const announcement = await Announcement.create({
    title: req.body.title,
    content: req.body.content,
    author: userId,
    course: courseId,
  });

  res.status(200).json({
    status: "success",
    data: announcement,
  });
});

export const getAnnouncements = catchAsync(async (req, res, next) => {
    const userId = req.user.id || req.params.userId
    
    const courses = await Course.find({students:userId})

    const coursesIDs =courses.map(course=>course._id)
    
    const announcements =await Announcement.find({course:{$in:coursesIDs}}).populate({
      path:"author",
      ref:"User",
    }).populate({
      path:"course",
      ref:"Course",
    })

    res.status(200).json({
        status:"success",
        data:announcements
    })

});

export const updateAnnouncement = catchAsync(async (rea, res, next) => {
  const course =await Announcement.findByIdAndUpdate(req.params.announcementId , req.body , {
    runValidators:true,
  })
  
  res.status(201).json({
  status:"success",
  data:course
  })
});

export const deleteAnnouncement = catchAsync(async (rea, res, next) => {
  const course =await Announcement.findByIdAndDelete(req.params.announcementId)

res.status(201).json({
  status:"success",
  data:course
})

});
