import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    order:{
        type:Number,
        required:true
    },
    contentType:{
        type:String,
        enum:["video","pdf"],
        required:true
    }, 
    filePath:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
     }
})

export const sessionModel = mongoose.model("session", sessionSchema)