import { Input, Button, Select } from "../components/index";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../assets/bg-img.jpg";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Lock, Shield } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !role || role === "Select") {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/login`,
        { email, password, role }
      );

      if (response.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("user", JSON.stringify(response.data.message));

        setTimeout(() => handleDashboard(), 1000);
      } else toast.error(response.data.message || "Login failed");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleDashboard = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const role = userData?.user?.role;

    if (role === "Teacher") navigate("/teacher");
    else if (role === "Student") navigate("/student");
    else if (role === "Parent") navigate("/parentForm");
    else navigate("/admin");
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
        transition={{ duration: 0.55 }}
        className="
          drop-shadow-2xl w-[480px] px-12 py-8 rounded-3xl
          bg-white/80 backdrop-blur-xl border border-gray-200
          hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
        "
      >
        <h2 className="text-center text-3xl font-serif font-bold text-blue-800 mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-center text-base text-gray-600 mb-6">
          New here?{" "}
          <Link to="/signup" className="text-blue-700 font-semibold hover:underline">
            Create an account
          </Link>
        </p>

        <form onSubmit={handleLogin}>
          <div className="space-y-5">
            <Input
              label="Email"
              icon={<Mail className="h-5 w-5" />}
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <Input
              label="Password"
              icon={<Lock className="h-5 w-5" />}
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <Select
              label="Role"
              icon={<Shield className="h-5 w-5" />}
              options={["Select", "Admin", "Teacher", "Student", "Parent"]}
              onChange={(e) => setRole(e.target.value)}
              value={role}
            />

            <motion.p
              whileHover={{ scale: 1.05 }}
              className="text-end text-blue-700 cursor-pointer hover:underline"
            >
              Forgot Password?
            </motion.p>

            <Button
              className="
                bg-blue-600 text-white text-lg py-2 px-7 rounded-2xl w-full font-semibold
                hover:bg-blue-700 hover:shadow-lg hover:-translate-y-[2px]
                transition-all duration-300 mt-4
              "
              type="submit"
            >
              Sign In
            </Button>
          </div>
        </form>
      </motion.div>

      <Toaster />
    </div>
  );
}

export default Login;

