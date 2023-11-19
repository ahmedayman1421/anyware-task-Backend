import dotenv from "dotenv";

import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config({ path: "./config.env" });

connectDB();

app.listen(process.env.PORT || 8000, () =>
  console.log(`App is running on port ${process.env.PORT || 8000}`)
);
