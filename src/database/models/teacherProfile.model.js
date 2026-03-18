import mongoose from "mongoose";


export const teacherSchema = mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
      cardNumber:{
        type: String,
        required:true
      }
    }
)

export const teacherModel = mongoose.model("teacher", teacherSchema)