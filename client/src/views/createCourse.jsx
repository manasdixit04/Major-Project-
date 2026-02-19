
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Navbar,Button } from "../components";
import { Box } from "@mui/material";
import Sidenavbar from "../components/Sidenavbar";
import { motion } from "framer-motion";
import { BookPlus, FileText, UserPlus, CheckCircle2 } from "lucide-react";

function CreateCourseForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/courses/createCourse`,
        { title, description, createdBy }
      );

      if (response.data.success) {
        toast.success("Course created");

        setTimeout(() => {
          navigate("/course");
        }, 1200);
      } else {
        toast.error(response.data.message || "Failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden">
      <Navbar />
      <Box height={75} />

      <Box sx={{ display: "flex", pl: 4, pr: 4 }}>
        <Sidenavbar />

        {/* FORM CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
          w-full mx-auto p-6 my-7 rounded-xl bg-white shadow-sm shadow-blue-200 
          border border-blue-300 hover:shadow-sm hover:shadow-blue-300 
          transition-all duration-300
          "
        >
          <h2 className="text-3xl font-serif font-semibold text-blue-900 mb-5 flex items-center gap-3">
            <BookPlus className="h-8 w-8 text-blue-700" />
            Create New Course
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* TITLE */}
            <div>
              <label className="block text-sm font-semibold text-blue-800 mb-1  items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" /> Course Title
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
                  w-full border border-blue-300 rounded-lg px-4 py-2 
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                  transition-all duration-200 bg-white text-blue-900
                "
                placeholder="Enter course title"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-semibold text-blue-800 mb-1 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" /> Description
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="
                  w-full border border-blue-300 rounded-lg px-4 py-2 
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                  transition-all duration-200 bg-white text-blue-900
                "
                placeholder="Explain what this course is about"
                required
              />
            </div>

            {/* CREATED BY */}
            <div>
              <label className="block text-sm font-semibold text-blue-800 mb-1 flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-blue-600" /> Created By
              </label>
              <input
                type="text"
                name="createdBy"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                className="
                  w-full border border-blue-300 rounded-lg px-4 py-2 
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                  transition-all duration-200 bg-white text-blue-900
                "
                placeholder="User ID or Name"
                required
              />
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              type="submit"
              className="
                bg-blue-700 text-white px-6 py-3 rounded-lg 
                font-semibold text-lg shadow-md shadow-blue-300
                hover:bg-blue-800 transition-all duration-300
                flex items-center gap-2 mx-auto
              "
            >
              <CheckCircle2 className="h-6 w-6" />
              Create Course
            </Button>
          </form>

          <Toaster />
        </motion.div>
      </Box>

      <Toaster />
    </div>
  );
}

export default CreateCourseForm;
