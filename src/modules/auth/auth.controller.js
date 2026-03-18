import express from "express"
import { login, register } from "./auth.service.js"
import { validation } from "../../../utils/validation.js"
import { LoginSchema, SignUpSchema } from "./auth.validation.js"

let router = express.Router()

router.post("/register",validation(SignUpSchema),register)
router.post("/login",validation(LoginSchema),login)

export default router