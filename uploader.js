import mongoose from "mongoose";
import fs from "fs";
import User from "./models/user.js";
import Course from "./models/course.js";
import Announcement from "./models/announcement.js";


const DB ="mongodb+srv://ahmedayman212999:ahmedayman212999@cluster0.buloud3.mongodb.net/"

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

// READ JSON FILE
// const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
// const courses = JSON.parse(fs.readFileSync("./data/courses.json", "utf-8"));
const announcements = JSON.parse(fs.readFileSync("./demoData/announcement.json", "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    // await Course.create(courses);
    await Announcement.create(announcements);

    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
}

if (process.argv[2] === "--delete") {
  deleteData();
}
