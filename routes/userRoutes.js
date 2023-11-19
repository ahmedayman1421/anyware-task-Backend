import express from "express";

import { login, protect, register, updatePassword,logout } from "../controllers/authController.js";
import { getAllUser, getUser, updateMe } from "../controllers/userController.js";
import { resizePhoto, uploadUserPhoto } from "../controllers/middleware.js";


const userRoutes = express.Router();

userRoutes.route("/register").post(uploadUserPhoto, resizePhoto, register);
userRoutes.route("/login").post(login);
userRoutes.route("/logout").get(logout);

userRoutes.use(protect);

userRoutes.route("/").get(getAllUser);
userRoutes.route("/:id").get(getUser);
userRoutes.route("/me").get(getUser);

userRoutes.route("/updatepassword").patch(updatePassword);
userRoutes.patch("/updateMe", uploadUserPhoto, resizePhoto, updateMe);

export default userRoutes;
