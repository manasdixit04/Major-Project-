// routes/admin.routes.js
import express from "express";
import { getDashboardStats } from "../controllers/admin.controller.js";
// import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";

const adminRouter = express.Router();

adminRouter.get(
  "/dashboard-stats",
  verifyJWT,
  isAdmin,
  getDashboardStats
);

export {adminRouter};
