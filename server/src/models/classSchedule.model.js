import mongoose from "mongoose";

const ClassScheduleSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim:true
    },
    teacher: {
      type: String,
      required:true,
       trim:true
    },
    time:{
        type:String,
        required: true
    },
    date:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);

export const ClassSchedule = mongoose.model("ClassSchedule", ClassScheduleSchema);
