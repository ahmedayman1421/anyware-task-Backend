import express from "express";
import morgan from "morgan";
import cors from "cors";
import xss from "xss-clean";

import courseReviewRoute from "./routes/courseReviewRoute.js";
import errorController from "./controllers/errorController.js";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";

const app = express();

app.use("/public", express.static("./public"));

app.use(cors({ credentials: true }));
app.options("*", cors());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));


app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(xss());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());


app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/review", courseReviewRoute);
app.use("/api/announcement", announcementRoutes);

app.all("*", (req, _, next) => {
  const err = new Error(`Can't Find ${req.originalUrl}`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use(errorController);

export default app;
