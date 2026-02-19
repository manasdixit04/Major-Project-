import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Announcement = mongoose.model(
  "Announcement",
  announcementSchema
);
