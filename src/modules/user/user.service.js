import { userModel } from "../../database/models/user.model.js";


export const getAllUser = async(req ,res)=>{
    let users = await userModel.find()
    if(users.length>0){
        res.json({message:"users data", users})
    }else{
        res.json({message:"no users found"})
    }
}

export const getUserById = async (req , res)=>{
    let{id}= req.params
    let user = await userModel.findById(id)
    if (user){
        res.json({message:"user data", user})
    }else{
        res.json({message:"no user found"})
    }
}

export const banUser = async(req ,res)=>{
    let{id}= req.params
    let user = await userModel.findById(id)
    if(!user){
       return  res.json({message:"user not found"})
    }
    if(!user.isActive){
        return  res.json({message:"user already baned"})
    }
    let banedUser = await userModel.findByIdAndUpdate(id , {isActive:false}, {new:true})
    if(banedUser){
        res.json({message:"ban user done successfully"})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const unBanUser = async(req ,res)=>{
    let{id}= req.params
    let user = await userModel.findById(id)
    if(!user){
       return  res.json({message:"user not found"})
    }
    if(user.isActive){
        return  res.json({message:"user already active"})
    }
    let banedUser = await userModel.findByIdAndUpdate(id , {isActive:true}, {new:true})
    if(banedUser){
        res.json({message:"activated user done successfully"})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const deleteUser = async(req ,res)=>{
    let{id}= req.params
    let user = await userModel.findById(id)
    if(!user){
       return  res.json({message:"user not found"})
    }
    let deletedUser = await userModel.findByIdAndDelete(id)
    if(deletedUser){
        res.json({message:"user deleted successfully"})
    }else{
        res.json({message:"something went wrong"})
    }
}

