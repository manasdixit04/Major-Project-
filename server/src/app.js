import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import { userRouter } from "./routes/user.route.js";
import { courseRouter } from "./routes/course.route.js";
import { quizRouter } from "./routes/quiz.route.js";
import resultRouter from "./routes/result.route.js";
import { scheduleRouter } from "./routes/classSchedule.route.js";
import { announcementRouter } from "./routes/announcement.route.js";
import { adminRouter } from "./routes/admin.route.js";


app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/quiz", quizRouter);
app.use("/api/v1/result", resultRouter)
app.use("/api/v1/schedule", scheduleRouter)
app.use("/api/v1/event", announcementRouter)


// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

export { app };
