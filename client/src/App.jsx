import "./App.css";
import { Button } from "./components";
import signupImg from "./assets/Signup.png";
import { Link } from "react-router-dom";
import bgImg from "./assets/bg-img.jpg";
import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";

function App() {
  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen backdrop-blur-sm"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.32)), url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
       
          
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            flex flex-row justify-center items-center gap-20 
            px-16 py-10 rounded-3xl 
            bg-white/80 shadow-xl border border-gray-200
            hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
          "
        >

          {/* LEFT BUTTON SECTION */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            <Link to="/signup" className="w-40">
              <Button
                className="
                w-full bg-blue-600 text-white rounded-2xl
                py-3 font-semibold tracking-wide
                flex items-center justify-center gap-2
                hover:bg-blue-700 hover:shadow-lg hover:-translate-y-[2px]
                transition-all duration-300
              "
              >
                <UserPlus className="h-5 w-5" />
                Signup
              </Button>
            </Link>

            <span className="font-serif text-gray-700 text-lg">OR</span>

            <Link to="/login" className="w-40">
              <Button
                className="
                w-full bg-blue-600 text-white rounded-2xl
                py-3 font-semibold tracking-wide
                flex items-center justify-center gap-2
                hover:bg-blue-700 hover:shadow-lg hover:-translate-y-[2px]
                transition-all duration-300
              "
              >
                <LogIn className="h-5 w-5" />
                Login
              </Button>
            </Link>
          </motion.div>

          {/* IMAGE SECTION */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="border-l-4 border-blue-300 pl-10"
          >
            <img
              src={signupImg}
              alt="signup"
              style={{ height: "350px" }}
              className="rounded-xl shadow-md"
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default App;

