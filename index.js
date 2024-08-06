import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/video.js";
import commentRoutes from "./routes/comment.js";
import authRoutes from "./routes/auth.js";
const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("MongoDB connected");
    // code that relies on the MongoDB connection here
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

 app.use(express.json());
 app.use("/api/users", userRoutes);
 app.use("/api/videos", videoRoutes);
 app.use("/api/comments", commentRoutes);
 app.use("/api/auth", authRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});


app.listen(8000, ()=>{console.log("connected")})