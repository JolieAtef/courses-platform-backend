import mongoose from "mongoose";

const enrollmentSchema = mongoose.Schema({
     
 student:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"course",
    required:true
  },
  enrolledAt:{
    type:Date,
    required:true
  },
  completedSessions:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"session"
    }]
})

export const enrollmentModel = mongoose.model("enrollment",enrollmentSchema)