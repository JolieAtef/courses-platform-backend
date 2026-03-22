import express from "express"
import { authenticate, authorize } from "../../common/middleware/auth.js"
import { deleteQuestion, updateQuestion } from "./question.service.js"

let router = express.Router()

router.put("/:id",authenticate,authorize("teacher"),updateQuestion)

router.delete("/:id",authenticate,authorize("teacher"),deleteQuestion)

export default router