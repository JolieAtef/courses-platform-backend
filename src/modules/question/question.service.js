import { courseModel } from "../../database/models/course.model.js";
import { enrollmentModel } from "../../database/models/enrollment.model.js";
import { questionModel } from "../../database/models/question.model.js";
import { sessionModel } from "../../database/models/session.model.js";

export const addQuestion = async(req ,res)=>{
    let {sessionId} = req.params
    let{text , options ,correctAnswerIndex}= req.body
    let session = await sessionModel.findById(sessionId)
    if(!session){
        return res.json({message:"session not found"})
    }
    let addedQuestion = await questionModel.insertMany({session:sessionId,text , options ,correctAnswerIndex})
    if(addedQuestion){
        res.json({message:"question added successfully",addedQuestion})
    }else{
        res.json({message:"something went wrong"}) 
    }
}

export const getSessionQuestions = async(req ,res)=>{
    let {sessionId} = req.params
    let session = await sessionModel.findById(sessionId)
    if(!session){
        return res.json({message:"session not found"})
    }
    let questions = await questionModel.find({session:sessionId}).select("-correctAnswerIndex")
    if(questions.length>0){
        res.json({message:"session questions",questions})
    }else{
        res.json({message:"no questions found"})
    }
}


export const updateQuestion = async(req,res)=>{
    let {id} = req.params
    let{text , options ,correctAnswerIndex} =req.body
    let question = await questionModel.findById(id)
    if(!question){
      return res.json({message:"question not found"}) 
    }
    let updatedQuestion = await questionModel.findByIdAndUpdate(id , {text , options ,correctAnswerIndex },{new:true})
    if(updatedQuestion){
        res.json({message:"question updated successfully",updatedQuestion})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const deleteQuestion = async(req ,res)=>{
    let {id} = req.params
    let question = await questionModel.findById(id)
    if(!question){
      return res.json({message:"question not found"}) 
    }

    let deletedQuestion = await questionModel.findByIdAndDelete(id)
    if(deletedQuestion){
        res.json({message:"question deleted successfully"})
    }else{
        res.json({message:"question not found"})
    }
}

export const submit = async(req ,res)=>{
    let {sessionId} = req.params
    // let [{questionId , answer}] = req.body

    let solutions = req.body.map(item => ({
        questionId: item.questionId,
        answer: item.answer
      }));

    let session = await sessionModel.findById(sessionId)
    if(!session){
        return res.json({message:"session not found"})
    }
    let questions = await questionModel.find({session:sessionId})
    if(questions.length==0){
        return res.json({message:"no questions found"})
    }
    let result=0
    solutions.map((q)=>{
        let answer = questions.find((ques)=>ques._id==q.questionId).correctAnswerIndex
        if(answer == q.answer){
           result+=1
        }
    })

    if(result/questions.length >= 0.7){
        let completedSession =await enrollmentModel.updateOne({course:session.course , student:req.user.id}, {$addToSet: { completedSessions: sessionId }})
        if(!completedSession.modifiedCount){
           return res.json({message:"You already completed this session"})
        }
        res.json({message:"congratulations you pass the exam",result})
    }else{
        res.json({message:"sorry you fail , try again"})
    }
}




