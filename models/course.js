import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  coverImage: {type: String,default: "default.png"},
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  ratingsAverage: {
    type: Number,
    default: 5,
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

courseSchema.virtual("announcements", {
  ref: "Announcement",
  foreignField: "course",
  localField: "_id",
});

courseSchema.virtual("reviews", {
  ref: "CourseReview",
  foreignField: "course",
  localField: "_id",
});


const Course = mongoose.model("Course", courseSchema);

export default Course;
