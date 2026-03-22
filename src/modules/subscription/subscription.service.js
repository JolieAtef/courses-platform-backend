import { courseModel } from "../../database/models/course.model.js"
import { enrollmentModel } from "../../database/models/enrollment.model.js"
import { transactionModel } from "../../database/models/transaction.model.js"
import { userModel } from "../../database/models/user.model.js"

export const subscribe =async(req ,res)=>{
    let {id} = req.params
    let {cardNumber } = req.body
    let course = await courseModel.findById(id)
    if(course.price>0){
        if(!cardNumber){
            return res.json({message:"cardNumber is required"})
        }
        // validate card number
      let transaction = await transactionModel.insertMany({student:req.user.id , teacher:course.teacher , course:id ,amount:course.price , cardNumber , status:"success"})
      if(!transaction){
        return res.json({message:"something went wrong with transaction"})
      }
    }
    let existEnrollment =await enrollmentModel.findOne({student:req.user.id , course:id })
    if(existEnrollment){
        return res.json({message:"you are already enrolled",existEnrollment})
    }else{
        let addedEnrollment = await enrollmentModel.insertMany({student:req.user.id , course:id ,  enrolledAt:Date.now(), completedSessions:[]})
        if(addedEnrollment){
            res.json({message:"enrollment done successfully",addedEnrollment})
        }else{
            res.json({message:"something went wrong with enrollment"})
        }
    }

}

export const studentEnrollments = async(req , res)=>{
    let student = await userModel.findById(req.usre.id)
    if(!student){
        return res.json({message:"student not found"})
    }
    let enrollments = await enrollmentModel.find({student:req.user.id})
    if(enrollments.length > 0){
        res.json({message:"student enrollments",enrollments})
    }else{
        res.json({message:"no enrollments found"})
    }
} 


