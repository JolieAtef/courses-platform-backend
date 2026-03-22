import { courseModel } from "../../database/models/course.model.js";
import { sessionModel } from "../../database/models/session.model.js";
import fs from "fs/promises";

export const addSession=async(req ,res)=>{
    let{courseId} = req.params
    let{ title ,contentType, duration}=req.body
    let course = await courseModel.findById(courseId)
    if(!course){
      return res.json({message:"course not found"}) 
    }
    let order
    let lastSession = await sessionModel.findOne({course:courseId }).sort({order:-1}).limit(1)
    if(lastSession){
         order = lastSession.order +1
    }else{
        order = 1
    }
    let filePath
    if(req.file){
        if(contentType=="pdf"){
            filePath=`localhost:3000/uploads/pdfs/${req.file.filename}`
        }else if (contentType=="video"){
            filePath=`localhost:3000/uploads/videos/${req.file.filename}`
        }
    }
    let addedSession= await sessionModel.insertMany({course:req.params.courseId ,title , order ,contentType, filePath, duration})
    if(addSession){
        res.json({message:"session added successfully",addedSession})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const getCourseSessions = async(req ,res)=>{
    let{courseId} = req.params
    let course = await courseModel.findById(courseId)
    if(!course){
      return res.json({message:"course not found"}) 
    }
    let sessions = await sessionModel.find({course:courseId})
    if(sessions.length>0){
        res.json({message:"sessions of course", sessions})
    }
    else{
        res.json({message:"no sessions found"})
    }
}

export const getSessionData = async(req , res)=>{
     let {id} = req.params
     let session = await sessionModel.findById(id)
     if(session){
        res.json({message:"session data" ,session})
     }else{
        res.json({message:"no session found"})
     }
}

export const updateSession = async(req,res)=>{
    let {id} = req.params
    let{ title , order ,contentType , duration}=req.body
    let session = await sessionModel.findById(id)
    if(!session){
      return res.json({message:"session not found"}) 
    }
    let filePath
    if(req.file){
        if(contentType=="pdf"){
            filePath=`localhost:3000/uploads/pdfs/${req.file.filename}`
        }else if (contentType=="video"){
            filePath=`localhost:3000/uploads/videos/${req.file.filename}`
        }
    }
    let updatedSession = await sessionModel.findByIdAndUpdate(id , { title , order ,contentType, filePath, duration},{new:true})
    if(updatedSession){
        res.json({message:"session updated successfully",updatedSession})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const deleteSession = async(req ,res)=>{
    let {id} = req.params
    let session = await sessionModel.findById(id)
    if(!session){
      return res.json({message:"session not found"}) 
    } 
    /// delete session file from uploads first
    if (session.filePath) {
        try {
          await fs.unlink(session.filePath);
          } catch (err) {
            console.log("File delete error:", err);
          }    
    }

    let deletedSession = await sessionModel.findByIdAndDelete(id)
    if(deletedSession){
        await sessionModel.updateMany({course:session.course , order:{ $gt: session.order }},{$inc:{order:-1}})
        res.json({message:"session deleted successfully"})
    }else{
        res.json({message:"session not found"})
    }
}

export const streamVideo = async (req, res) => {
    res.json({message:"watching"})
    // 1. Find session by ID, verify student is enrolled
    // 2. Check student passed quiz of PREVIOUS session (if not first)
    // 3. Get filePath from session document
    // 4. const stat = fs.statSync(filePath)  →  get total file size
    // 5. Parse req.headers.range  →  e.g. "bytes=0-"
    // 6. Calculate start, end, chunkSize
    // 7. Set headers and pipe the stream:
    //    
    //    
};

export const downloadPdf = async (req, res) => {
    // 1. Find session by ID, verify student is enrolled
    // 2. Check student passed quiz of PREVIOUS session (if not first)
    // 3. Get filePath from session document
    // 4. const stat = fs.statSync(filePath)  →  get total file size
    // 5. Parse req.headers.range  →  e.g. "bytes=0-"
    // 6. Calculate start, end, chunkSize
    // 7. Set headers and pipe the stream:   
};