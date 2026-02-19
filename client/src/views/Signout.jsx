import React from "react";
import { Button } from "../components";
import bgImgLogout from "../assets/signoutImg.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaSignOutAlt, FaCheck, FaTimes } from "react-icons/fa";
import "../../src/index.css"

function Signout() {
  const navigate = useNavigate();

  const handleNoButton = () => {
    navigate("/");
  };

  const handleYesButton = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Logged out successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(response.data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    }
  };

  return (
    <div
      className="relative flex items-center justify-center w-full h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bgImgLogout})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      <div className="relative z-10 flex flex-col items-center gap-4 px-8 py-6
      bg-white rounded-2xl shadow-2xl border border-gray-300
      animate-fadeIn">

        <div className="flex items-center gap-3 border-b pb-2 border-gray-300 w-full justify-center">
          <FaSignOutAlt className="text-blue-700" size={28} />
          <p className="text-3xl font-semibold text-blue-700">Sign Out</p>
        </div>

        <p className="text-lg text-gray-700 font-medium tracking-wide">
          Are you sure you want to sign out?
        </p>

        <div className="flex gap-5 mt-2">
          <Button
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg
            hover:bg-blue-700 hover:scale-[1.05] active:scale-95 transition duration-300 shadow"
            onClick={handleYesButton}
          >
            <FaCheck /> Yes
          </Button>

          <Button
            className="flex items-center gap-2 bg-gray-400 text-white px-6 py-2 rounded-lg
            hover:bg-gray-500 hover:scale-[1.05] active:scale-95 transition duration-300 shadow"
            onClick={handleNoButton}
          >
            <FaTimes /> No
          </Button>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default Signout;
