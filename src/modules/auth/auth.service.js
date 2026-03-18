import { generateToken } from "../../common/middleware/auth.js";
import { userModel } from "../../database/models/user.model.js";
import bcrypt from "bcrypt"

export const register = async(req, res)=>{
    let{name , email , password ,role } = req.body

    let existEmail= await userModel.findOne({email})
    if(existEmail){
        return res.json({message:"Email already exist"})
    }
    let hashedPassword= await bcrypt.hash(password,10)
    let newUser = await userModel.insertMany({name , email , password:hashedPassword ,role})
    if(newUser){
        res.json({message:"register done successfully",newUser})
    }else{
        res.json({message:"something went wrong"})
    }
}


export const login = async(req ,res)=>{
    let{email , password } = req.body 
    let user = await userModel.findOne({email})
    if(!user){
        return res.json({message:"user not found"})
    }
    let login = await bcrypt.compare(password , user.password)
    if(login){
       let{token}= generateToken(user)
       res.json({message:"login done successfully",token})    
    }else{
       res.json({message:"something went wrong"})
    }
}