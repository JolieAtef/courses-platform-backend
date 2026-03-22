import jwt from "jsonwebtoken"
import { userModel } from "../../database/models/user.model.js"
import { courseModel } from "../../database/models/course.model.js"
import { sessionModel } from "../../database/models/session.model.js"
import { enrollmentModel } from "../../database/models/enrollment.model.js"

export const generateToken= (user)=>{
    let signature =""
    switch(user.role){
        case "student":
            signature="s_s"
            break;
        case "teacher":
          signature="t_s"
          break;
        case "admin":
            signature="a_s"
            break;
        default:
            break;
    }

    let token = jwt.sign({id:user._id },signature,{expiresIn:"7d"})
    return{token}
}

export const authenticate =(req , res , next)=>{
    let {authorization} = req.headers
    let[bearer , token] = authorization.split(" ")
    let signature
    switch(bearer){
        case "student":
            signature="s_s"
            break;
        case "teacher":
          signature="t_s"
          break;
        case "admin":
            signature="a_s"
            break;
        default:
            break;
    }

    let decode = jwt. verify(token , signature)
    req.user = decode
    next()
}

export const authorize = (role)=>{
    return async(req , res , next)=>{
        let user = await userModel.findById(req.user.id)
        if(user.role == role){
            next()
        }else{
            return res.json({message:"user hasn't access"})
        }
    }
}

export const courseIsOwner = async(req , res , next)=>{
    let course = await courseModel.findById(req.params.id) 
    if(!course){
        course = await courseModel.findById(req.params.courseId)
        if(!course){
            return res.json({message:"course not found"})
        }
    }
        if(course.teacher == req.user.id){
             next()
        }else{
            res.json({message:"not the course owner"})
        }       
}

export const sessionIsOwner = async(req , res , next)=>{
    let session = await sessionModel.findById(req.params.id)
    if(!session){
        session = await sessionModel.findById(req.params.sessionId)
        if(!session){
            return res.json({message:"session not found"}) 
        }
    } 
    let course = await courseModel.findById(session.course)
        if(course.teacher == req.user.id){
             next()
        }else{
            res.json({message:"not the session owner"})
        }       
}

export const isEnrolledCourse = async(req ,res , next )=>{
    let user = await userModel.findById(req.user.id)
    if(user.role == "teacher"){
        next()
    }else{
        let enrollment = await enrollmentModel.findOne({student:req.user.id , course:req.params.courseId})
        if(enrollment){
            next()
        }else{
            res.json({message:"user didn't enroll this course and not teacher"})
        }
    }
}

export const isEnrolledSession = async(req ,res , next )=>{
    let user = await userModel.findById(req.user.id)
    if(user.role == "teacher"){
        next()
    }else{
        let session =await sessionModel.findById(req.params.sessionId)
        if(!session){
            session = await sessionModel.findById(req.params.id)
            if(!session){
                return res.json({message:"session not found"}) 
            }
        }   
        let enrollment = await enrollmentModel.findOne({student:req.user.id , course:session.course})
        if(!enrollment){
            return res.json({message:"user didn't enroll this course"})
        }
        if(session.order == 1){
            next()
        }else{
            let previousSession = await sessionModel.findOne({course:session.course, order:session.order-1})
            if(enrollment.completedSessions.some((id)=>id.toString() == previousSession._id.toString())){
                next()
            }else{
                res.json({message:"user didn't complete previous session yet"})
            }
        }
    }
}

