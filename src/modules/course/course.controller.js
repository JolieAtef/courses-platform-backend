import express from "express"
import { authenticate, authorize, courseIsOwner, isEnrolledCourse } from "../../common/middleware/auth.js"
import { addCourse, deleteCourse, getAllCourses, getCourseById, getTeacherCourses, updateCourse } from "./course.service.js"
import { addSession, getCourseSessions } from "../session/session.service.js"
import { validation } from "../../../utils/validation.js"
import { addCourseSchema, updateCourseSchema } from "./course.validation.js"
import { addSessionSchema } from "../session/session.validation.js"
import {  uploadFile, uploadImage } from "../../common/middleware/multer.js"

let router = express.Router()


router.post("/", authenticate,authorize("teacher"),validation(addCourseSchema),uploadImage().array("thumbnail", 5),addCourse)

router.get("/",getAllCourses)

router.get("/my",authenticate,authorize("teacher"), getTeacherCourses)

router.get("/:id", getCourseById)

router.put("/:id",authenticate,authorize("teacher"),courseIsOwner,validation(updateCourseSchema),uploadImage().array("thumbnail", 5),updateCourse)

router.delete("/:id",authenticate,authorize("teacher"),courseIsOwner, deleteCourse)

router.post("/:courseId/sessions",authenticate,authorize("teacher"),courseIsOwner,validation(addSessionSchema),uploadFile().single("filePath"),addSession)

router.get("/:courseId/sessions",authenticate, isEnrolledCourse,getCourseSessions)

export default router