import { Router } from "express";

import {
  courseCreation,
  deleteCourse,
  getAllCourses,
  updateCourse,
} from "../controllers/course.controller.js";

const courseRouter = Router();

courseRouter.post("/createCourse", courseCreation);
courseRouter.get("/getAllCourses", getAllCourses);
courseRouter.put("/:id", updateCourse);
courseRouter.delete("/delete/:id", deleteCourse);

export { courseRouter };
