import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "../src/views/Signup.jsx";
import Login from "../src/views/Login.jsx";
import Admin from "./views/Dashboard/Admin.jsx";
import Student from "./views/Dashboard/Student.jsx";
import Teacher from "./views/Dashboard/Teacher.jsx";
import Parent from "./views/Dashboard/Parent.jsx";
import StudentParentForm from "../src/components/student-parent.jsx";
import Gamification from "../src/views/Gamification.jsx";
import CommunicationPage from "./views/Communication.jsx";
import Signout from "../src/views/Signout.jsx";
import ClassEvents from "./views/ClassEvents.jsx";
import PerformanceOverview from "../src/views/PerformanceOverview.jsx";
import EditProfile from "../src/components/EditProfile.jsx";
import CreateExam from "./views/CreateExam.jsx";
import ExamPage from "../src/views/ExamPage.jsx";
import ExamResult from "./views/ExamResult.jsx";
import StudentDashboard from "../src/views/StudentDashboard.jsx";
import Courses from "./views/Courses.jsx";
import CoursePreview from "./views/CoursePreview.jsx";
import Profile from "../src/views/MyProfile.jsx";
import UpdateCourse from "../src/components/UpdateCourse.jsx";
import EmailNotification from "./views/EmailNotification.jsx";
import AttendanceGrade from "./views/AttendanceGrade.jsx";
import CreateCourseForm from "./views/createCourse.jsx";
import CreateAnnouncement from "./views/CreateAnnouncement.jsx";
import CreateClassSchedule from "./views/CreateClassSchedule.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/teacher" element={<Teacher />} />
      <Route path="/createExam" element={<CreateExam />} />
      <Route path="/examPage/:id" element={<ExamPage />} />
      <Route path="/exam/:id/result" element={<ExamResult />} />
      <Route path="/studentDashboard" element={<StudentDashboard />} />
      <Route path="/createCourse" element={<CreateCourseForm />} />
      <Route path="/course" element={<Courses />} />
      <Route path="/coursePreview" element={<CoursePreview />} />
      <Route path="/updateCourse" element={<UpdateCourse />} />
      <Route path="/student" element={<Student />} />
      <Route path="/parentForm" element={<StudentParentForm />} />
      <Route path="/challenges" element={<Gamification />} />
      <Route path="/parent" element={<Parent />} />
      <Route path="/performanceOverview" element={<PerformanceOverview />} />
      <Route path="/classEvents" element={<ClassEvents />} />
      <Route path="/attendanceGrade" element={<AttendanceGrade />} />
      <Route path="/communication" element={<CommunicationPage />} />
      <Route path="/signout" element={<Signout />} />
      <Route path="/email" element={<EmailNotification />} />
      <Route path="/addSchedule" element={<CreateClassSchedule />} />
      <Route path="/addAnnouncement" element={<CreateAnnouncement />} />
    </Routes>
  </BrowserRouter>
);
