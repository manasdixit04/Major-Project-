

import { Input, Button, Select } from "../components/index.js";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../assets/bg-img.jpg";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Lock, Shield } from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    standard: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.role ||
      formData.role === "Select"
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          standard: formData.standard,
        }
      );

      if (response.data.success) {
        toast.success("User Registered!");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
          standard: "",
        });
        setTimeout(() => navigate("/login"), 1500);
      } else toast.error(response.data.message || "Registration failed!!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div
      className="flex items-center justify-center w-full h-screen"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
        drop-shadow-2xl px-10 py-8 rounded-3xl w-[500px]
        bg-white/80 border border-gray-200 backdrop-blur-xl
        hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
      "
      >
        <h2 className="text-center text-3xl font-serif font-bold text-blue-800">
          Create Account
        </h2>

        <p className="mt-2 text-center text-base text-gray-600 mb-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-700 hover:underline"
          >
            Sign In
          </Link>
        </p>

        <form onSubmit={handleRegister}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              icon={<User className="h-5 w-5" />}
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Input
              label="Email"
              icon={<Mail className="h-5 w-5" />}
              type="email"
              name="email"
              value={formData.email}
              placeholder="example@gmail.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <Input
              label="Password"
              icon={<Lock className="h-5 w-5" />}
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <div className="flex flex-row gap-6">
              <Select
                label="Role"
                icon={<Shield className="h-5 w-5" />}
                options={["Select", "Admin", "Teacher", "Student", "Parent"]}
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />

              <Select
                label="Standard"
                options={["I","II","III","IV","V","VI","VII","VIII","IX","X"]}
                name="standard"
                value={formData.standard}
                onChange={(e) =>
                  setFormData({ ...formData, standard: e.target.value })
                }
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <Button
                className="
                  bg-blue-600 text-white py-2 px-10 rounded-2xl font-semibold
                  hover:bg-blue-700 hover:shadow-lg hover:-translate-y-[2px]
                  transition-all duration-300
                "
                type="submit"
              >
                Register
              </Button>

              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate("/")}
                className="cursor-pointer text-blue-700"
              >
                <ArrowLeft className="h-8 w-8" />
              </motion.div>
            </div>
          </div>
        </form>
      </motion.div>
      <Toaster />
    </div>
  );
}

export default Signup;
