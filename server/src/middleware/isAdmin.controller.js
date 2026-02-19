import { ApiError } from "../utils/ApiError.js";

/**
 * Admin authorization middleware
 * Must be used AFTER verifyJWT
 */
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized request");
  }

  if (req.user.role !== "admin") {
    throw new ApiError(403, "Admin access only");
  }

  next();
};
