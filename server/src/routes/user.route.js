import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  updateProfile,
} from "../controllers/user.controller.js";
import { verifyJWT, verifyRole } from "../middleware/auth.middleware.js";

const userRouter = Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected routes (require authentication)
userRouter.post("/logout", verifyJWT, logoutUser);
userRouter.get("/all-users", verifyJWT, getAllUsers);
userRouter.put("/update/:id", updateProfile);

// Example: Admin only route
userRouter.get("/admin-only", verifyJWT, verifyRole("Admin"), (req, res) => {
  res.json(new ApiResponse(200, {}, "Admin access granted"));
});

export { userRouter };
