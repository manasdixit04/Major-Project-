import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      uppercase: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);
