import express from "express"
import { authenticate, authorize, courseIsOwner, isEnrolledCourse } from "../../common/middleware/auth.js"
import { addCourse, deleteCourse, getAllCourses, getCourseById, getTeacherCourses, updateCourse } from "./course.service.js"
import { addSession, getCourseSessions } from "../session/session.service.js"
import { validation } from "../../../utils/validation.js"
import { addCourseSchema, updateCourseSchema } from "./course.validation.js"
import { addSessionSchema } from "../session/session.validation.js"

let router = express.Router()


router.post("/", authenticate,authorize("teacher"),validation(addCourseSchema),addCourse)

router.get("/",getAllCourses)

router.get("/my",authenticate,authorize("teacher"), getTeacherCourses)

router.get("/:id", getCourseById)

router.put("/:id",authenticate,authorize("teacher"),courseIsOwner,validation(updateCourseSchema), updateCourse)

router.delete("/:id",authenticate,authorize("teacher"),courseIsOwner, deleteCourse)

router.post("/:courseId/sessions",authenticate,authorize("teacher"),courseIsOwner,validation(addSessionSchema),addSession)

router.get("/:courseId/sessions",authenticate, isEnrolledCourse,getCourseSessions)

export default router