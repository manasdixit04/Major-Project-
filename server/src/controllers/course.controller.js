import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Course } from "../models/course.model.js";

const courseCreation = asyncHandler(async (req, res) => {
  const { title, description, createdBy } = req.body;

  if (!title || !description || !createdBy) {
    throw new ApiError(400, "All fields are required");
  }

  if (
    [title, description, createdBy].some(
      (field) => field.toString().trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be non-empty");
  }

  const existedCourse = await Course.findOne({ title });

  if (existedCourse) {
    throw new ApiError(409, "Course already exists");
  }

  const course = await Course.create({
    title: title.trim().toUpperCase(),
    description,
    createdBy,
  });

  const createdCourse = await Course.findById(course._id);

  if (!createdCourse) {
    throw new ApiError(500, "Something went wrong while creating course");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdCourse, "Course Created!!"));
});

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().sort({createdAt: -1 });

  if (!courses) {
    throw new ApiError(409, "Courses not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, courses, "Courses fetched"));
});

const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description,createdBy } = req.body;

  if (
    (!title || title.trim() === "") &&
    (!description || description.trim() === "")&&
    (!createdBy || createdBy.trim() === "")
  ) {
    throw new ApiError(400, "At least one field  is required");
  }

  const updateData = {};
  if (title) {
    updateData.title = title.trim().toUpperCase();
  }

  if (description) {
    updateData.description = description.trim();
  }
  if (createdBy) {
    updateData.createdBy = createdBy.trim();
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    { $set: updateData }, //tells MongoDB to replace only the provided fields.
    { new: true } //tells mongoDB to return the new updated data
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCourse, "Course update successfully!! "));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedCourse = await Course.findByIdAndDelete(id);

  if (!deleteCourse) {
    throw new ApiError(409, "Course not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedCourse, "Course deleted successfully"));
});

export { courseCreation, getAllCourses, updateCourse, deleteCourse };
