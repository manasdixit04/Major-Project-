
import React from "react";
import { Navbar } from "../../components/index";
import Sidenavbar from "../../components/Sidenavbar";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  UsersIcon,
  BookOpenIcon,
  CalendarIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

const adminCards = [
  {
    title: "Total Users",
    value: 1245,
    icon: <UsersIcon className="h-10 w-10 text-blue-500 drop-shadow-md" />,
  },
  {
    title: "Teachers",
    value: 67,
    icon: <UserCircleIcon className="h-10 w-10 text-green-500 drop-shadow-md" />,
  },
  {
    title: "Courses",
    value: 32,
    icon: <BookOpenIcon className="h-10 w-10 text-indigo-500 drop-shadow-md" />,
  },
  {
    title: "Events",
    value: 8,
    icon: <CalendarIcon className="h-10 w-10 text-purple-500 drop-shadow-md" />,
  },
  {
    title: "Announcements",
    value: 14,
    icon: <BellIcon className="h-10 w-10 text-red-500 drop-shadow-md" />,
  },
];

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />
      <Box height={75} />

      <Box sx={{ display: "flex", pl: 1, pr: 4 }}>
        <Sidenavbar />

        {/* MAIN CONTENT */}
        <div className="mx-auto w-full px-4">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-10 tracking-wide drop-shadow">
            Admin Dashboard
          </h1>

          {/* CARDS */}
          <div className="flex flex-wrap justify-evenly gap-8 px-4">
            {adminCards.map((card, index) => (
              <div
                key={index}
                className="
                bg-white 
                w-72 
                rounded-3xl 
                shadow-lg 
                p-6 
                flex 
                items-center 
                justify-between 
                gap-4 
                border 
                border-gray-200 
                transform 
                transition-all 
                duration-300 
                hover:scale-105 
                hover:shadow-2xl 
                hover:border-blue-400
                hover:bg-blue-50/40
                "
              >
                <div className="transform transition duration-300 hover:rotate-6">
                  {card.icon}
                </div>

                <div className="flex-flex-col text-right">
                  <p className="text-gray-600 text-xl font-semibold">
                    {card.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800 drop-shadow-sm">
                    {card.value}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <div className="mx-auto mt-16 px-4">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800 drop-shadow">
              Quick Actions
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button
                className="
                bg-blue-600 
                text-white 
                py-3 
                px-4 
                rounded-xl 
                shadow-md 
                hover:bg-blue-700 
                hover:shadow-xl 
                transition-all 
                duration-300 
                hover:scale-105
                "
                onClick={() => navigate("/student")}
              >
                Student Dashboard
              </button>

              <button
                className="
                bg-green-600 
                text-white 
                py-3 
                px-4 
                rounded-xl 
                shadow-md 
                hover:bg-green-700 
                hover:shadow-xl 
                transition-all 
                duration-300 
                hover:scale-105
                "
                onClick={() => navigate("/teacher")}
              >
                Teacher Dashboard
              </button>

              <button
                className="
                bg-purple-600 
                text-white 
                py-3 
                px-4 
                rounded-xl 
                shadow-md 
                hover:bg-purple-700 
                hover:shadow-xl 
                transition-all 
                duration-300 
                hover:scale-105
                "
                onClick={() => navigate("/parent")}
              >
                Parent Dashboard
              </button>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Admin;

