import mongoose, { modelNames } from "mongoose";

const transactionSchema = mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    cardNumber:{
        type:String
    },
    status:{
        type:String, 
        enum:["pending","success","failed"]
    },
},{
    timestamps:true
})


export const transactionModel = mongoose.model("transaction", transactionSchema)