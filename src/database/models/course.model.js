import mongoose from "mongoose";

export const courseSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
     description:{
        type:String,
        required:true,
     },
     teacher:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
     },
     price:{
        type:Number,
        default:0,
        required:true
     },
     thumbnail:{
        type:[String]
       }
      ,
     category:{
        type:String,
        required:true,
     }
})

export const courseModel = mongoose.model("course", courseSchema)