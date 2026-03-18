import { courseModel } from "../../database/models/course.model.js";
import { userModel } from "../../database/models/user.model.js";


export const addCourse = async(req ,res)=>{
    let{title,description,price, thumbnail, category} = req.body
    let existTeacher = await userModel.findById(req.user.id)
    if(!existTeacher){
        return res.json("teacher not found")
    }
    let addedCourse = await courseModel.insertMany({title,description,teacher:req.user.id,price, thumbnail, category})
    if(addedCourse){
        res.json({message:"course added successfully",addedCourse})
    }else{
        res.json({message:"something went wrong"})
    }
}


export const getAllCourses = async(req ,res)=>{
    let {q ,category, isFree , page=1 ,limit=5} = req.query
    page = Number(page);
    limit = Number(limit);

    const query = {};
    if (q) {
        query.$or = [
         { title: { $regex:q, $options: 'i' } },
         { description: { $regex:q, $options: 'i' } }
     ];
    }
    if(category){
        query.category=category
    }
    if(isFree==="true"||isFree==="True"){
        query.price=0
    }
    let skip = ( page-1)*limit
    let courses = await courseModel.find(query).skip(skip).limit(limit)
    if(courses.length>0){
        res.json({message:"courses data", courses})
    }
    else{
        res.json({message:"something went wrong"})
    }
}

export const getCourseById = async(req ,res)=>{
    let {id} = req.params
    let course= await courseModel.findById(id)
    if(course){
        res.json({message:"course data", course})
    }else{
        res.json({message:"course not found"})
    }
}


export const updateCourse = async(req ,res)=>{
    let {id} = req.params
    let{title,description,price, thumbnail, category} = req.body
    let existTeacher = await userModel.findById(req.user.id)
    if(!existTeacher){
        return res.json("teacher not found")
    }
    let updatedCourse = await courseModel.findByIdAndUpdate(id ,{title,description,price, thumbnail, category},{new:true})
    if(updatedCourse){
        res.json({message:"course updated successfully",updatedCourse})
    }else{
        res.json({message:"something went wrong"})
    }
}


export const deleteCourse = async(req ,res)=>{
    let {id} = req.params
    let deletedCourse= await courseModel.findByIdAndDelete(id)
    if(deletedCourse){
        res.json({message:"course deleted successfully"})
    }else{
        res.json({message:"course not found"})
    }
}


export const getTeacherCourses = async(req ,res)=>{
    let teacher = await userModel.findById(req.user.id)
    if(!teacher){
       res.json("teacher not found")
    }
    let courses = await courseModel.find({teacher:req.user.id})
    if(courses.length>0){
        res.json({message:"Teacher courses", courses})
    }
    else{
        res.json({message:"no courses found"})
    }
}

