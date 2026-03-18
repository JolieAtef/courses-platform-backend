import express from "express"
import { authenticate, authorize } from "../../common/middleware/auth.js"
import { submit } from "../question/question.service.js"
import { validation } from "../../../utils/validation.js"
import { subscribeSchema } from "./subscription.validation.js"
import { studentEnrollments } from "./subscription.service.js"

let router = express.Router()

router.post("/courses/:id/subscribe",authenticate,authorize("student"),validation(subscribeSchema),submit)

router.get("/enrollments/my",authenticate, authorize("student"),studentEnrollments)

export default router