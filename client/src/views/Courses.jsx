import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import Sidenavbar from "../components/Sidenavbar";
import { Navbar } from "../components";
import Box from "@mui/material/Box";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { BookOpen } from "lucide-react";

function Courses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/courses/getAllCourses`
        );

        setCourses(response.data.message);
      } catch (err) {
        toast.error("Failed to load courses");
        console.error("Error fetching courses:", err);
      }
    };
    getCourses();
  }, []);

  const deleteCourse = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/v1/courses/delete/${id}`
          );

          setCourses((prev) => prev.filter((c) => c._id !== id));
          Swal.fire("Deleted!", "Course removed successfully.", "success");
        } catch (err) {
          Swal.fire("Error", "Failed to delete course", "error");
        }
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenavbar />

        <div className="w-full p-4">
          {/* Page Title */}
          {/* <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-blue-700 h-8 w-8" />
            <h1 className="text-3xl font-semibold text-blue-900 tracking-wide">
              Manage Courses
            </h1>
          </div> */}

          {/* Course Cards Grid */}
          {/* <div
            className="
              grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
              gap-10 mt-4 pr-4 transition-all duration-300
            "
          >
            {Array.isArray(courses) &&
              courses.map((course) => (
                <CourseCard
                  key={course._id}
                  image={
                    course.image ||
                    "https://png.pngtree.com/thumb_back/fh260/background/20210317/pngtree-chalk-school-education-learning-student-teacher-classroom-blackboard-math-background-image_587212.jpg"
                  }
                  title={course.title}
                  description={course.description}
                  createdBy={course.createdBy}
                  btnEdit="Edit"
                  btnDelete="Delete"
                  onEdit={() => navigate("/updateCourse", { state: { course } })}
                  onDelete={() => deleteCourse(course._id)}
                  onPreview={() => navigate("/coursePreview", { state: { course } })}
                />
              ))}
          </div> */}




          <div
  className="
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
    gap-8 xl:gap-10 mt-4 pr-4 transition-all duration-300
  "
>
  {Array.isArray(courses) &&
    courses.map((course) => (
      <CourseCard
        key={course._id}
        image={
          course.image ||
          "https://png.pngtree.com/thumb_back/fh260/background/20210317/pngtree-chalk-school-education-learning-student-teacher-classroom-blackboard-math-background-image_587212.jpg"
        }
        title={course.title}
        description={course.description}
        createdBy={course.createdBy}
        btnEdit="Edit"
        btnDelete="Delete"
        onEdit={() => navigate("/updateCourse", { state: { course } })}
        onDelete={() => deleteCourse(course._id)}
        onPreview={() => navigate("/coursePreview", { state: { course } })}
      />
    ))}
</div>

        </div>
      </Box>
      <Toaster />
    </div>
  );
}

export default Courses;

