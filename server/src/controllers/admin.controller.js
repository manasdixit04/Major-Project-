import { asyncHandler } from "../utils/AsyncHandler.js";
import {User} from "../models/user.model.js";
import {Course} from "../models/course.model.js";
import {ClassSchedule} from "../models/classSchedule.model.js"
import {Announcement} from "../models/announcement.model.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    teachers,
    courses,
    event,
    announcements,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "teacher" }),
    Course.countDocuments(),
    ClassSchedule.countDocuments(),
    Announcement.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      teachers,
      courses,
      event,
      announcements,
    },
  });
});
