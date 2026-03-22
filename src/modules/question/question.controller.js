import express from "express"
import { authenticate, authorize } from "../../common/middleware/auth.js"
import { deleteQuestion, updateQuestion } from "./question.service.js"
import { validation } from "../../../utils/validation.js"
import { updateQuestionSchema } from "./question.validation.js"

let router = express.Router()

router.put("/:id",authenticate,authorize("teacher"),validation(updateQuestionSchema),updateQuestion)

router.delete("/:id",authenticate,authorize("teacher"),deleteQuestion)

export default router