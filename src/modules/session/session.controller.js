import express from "express"
import { authenticate, authorize, courseIsOwner, isEnrolledSession, sessionIsOwner } from "../../common/middleware/auth.js"
import { deleteSession, downloadPdf, getSessionData, streamVideo, updateSession } from "./session.service.js"
import { addQuestion, getSessionQuestions, submit } from "../question/question.service.js"
import { validation } from "../../../utils/validation.js"
import { addQuestionSchema, submitQuestionsSchema } from "../question/question.validation.js"

let router = express.Router()
router.get("/:id",authenticate, authorize("teacher"),sessionIsOwner,getSessionData)

router.put("/:id",authenticate, authorize("teacher"),sessionIsOwner,updateSession)

router.delete("/:id",authenticate, authorize("teacher"),sessionIsOwner,deleteSession)

router.get("/:id/stream",authenticate,isEnrolledSession,streamVideo)

router.get("/:id/pdf",authenticate,isEnrolledSession,downloadPdf)

router.post("/:sessionId/questions",authenticate, authorize("teacher"),sessionIsOwner,validation(addQuestionSchema),addQuestion)

router.get("/:sessionId/questions",authenticate,isEnrolledSession,getSessionQuestions)

router.post("/:sessionId/submit",authenticate, authorize("student"),isEnrolledSession,validation(submitQuestionsSchema),submit)

export default router