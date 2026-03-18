import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    session:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"session",
    required:true
    },
    text:{
        type:String,
        required:true
    },
     options:{
        type:[String],
        required:true
     },
     correctAnswerIndex:{
        type:Number,
        required:true
     }
})

export const questionModel = mongoose.model("question" , questionSchema)