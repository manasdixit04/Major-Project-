import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get token from header or cookies
    const token = req.header("Authorization")?.replace("Bearer ", "") || 
                  req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, "Unauthorized request - No token provided");
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Find user and attach to request
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
    if (!user) {
      throw new ApiError(401, "Invalid Access Token - User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid Access Token");
    }
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access Token Expired");
    }
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

// Optional: Role-based access control middleware
export const verifyRole = (...allowedRoles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized - Please login first");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, `Access denied. Required roles: ${allowedRoles.join(", ")}`);
    }

    next();
  });
};