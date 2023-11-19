import express from "express";

import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  updateAnnouncement,
} from "../controllers/announcementController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const announcementRoutes = express.Router();

announcementRoutes.use(protect);

announcementRoutes
  .route("/")
  .post(restrictTo("admin", "instructor"), createAnnouncement)
  .get(getAnnouncements);

announcementRoutes
  .route("/:announcementId")
  .patch(restrictTo("admin", "instructor"), updateAnnouncement)
  .delete(deleteAnnouncement);

export default announcementRoutes;
