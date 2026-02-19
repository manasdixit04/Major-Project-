import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";

// Helper function to generate tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token generation error:", error);
    console.error("Token generation error:", error);
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, standard } = req.body;

  // Better validation - check for undefined, null, and empty strings
  if (!name || !email || !password || !role) {
    throw new ApiError(400, "All fields are required");
  }

  if (
    [name, email, password, role].some(
      (field) => field.toString().trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be non-empty");
  }

  // Only check for email uniqueness (not password or role)
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await User.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    role,
    standard: standard || undefined,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  console.log("User registered successfully:", createdUser._id);

  // Fixed the response syntax - this was the main issue
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully!"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt for email:", email);
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    console.log("User not found for email:", email);
    throw new ApiError(404, "User does not exist");
  }

  console.log("User found, checking password...");
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    console.log("Invalid password for user:", email);
    throw new ApiError(401, "Invalid user credentials");
  }

  console.log("Password valid, generating tokens for user:", user._id);
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken"); // exclude sensitive fields
  return res
    .status(200)
    .json(new ApiResponse(200, users, "All users fetched successfully"));
});

// update user profile
const updateProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if ((!name || name.trim() === "") && (!email || email.trim() === "")) {
    throw new ApiError(400, "At least one field  is required");
  }
  // console.log(name, ":", email);

  const updateFields = {};
  if (name) {
    updateFields.name = name.trim();
  }
  if (email) {
    updateFields.email = email.trim();
  }
  // if (avatar) {
  //   updateProfile.avatar = avatar
  // } //add after

  // console.log(updateFields);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true }
  );
  // console.log(updateProfile);
  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

export { registerUser, loginUser, logoutUser, getAllUsers, updateProfile };
