import express from "express"
import { authenticate, authorize } from "../../common/middleware/auth.js"
import { validation } from "../../../utils/validation.js"
import { subscribeSchema } from "./subscription.validation.js"
import { studentEnrollments, subscribe } from "./subscription.service.js"

let router = express.Router()

router.post("/courses/:id/subscribe",authenticate,authorize("student"),validation(subscribeSchema),subscribe)

router.get("/enrollments/my",authenticate, authorize("student"),studentEnrollments)

export default router