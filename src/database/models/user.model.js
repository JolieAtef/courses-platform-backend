import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin", "teacher", "student"],
        default:"student"
    },
    isActive:{
        type:Boolean,
        default:false
    },
    profilePicture:{
        type:String
    } 
},{
    timestamps:true
})

export const userModel= mongoose.model("user", userSchema)