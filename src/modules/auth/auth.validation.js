import joi from "joi"

export const SignUpSchema = joi.object({
    name:joi.string().required().min(2).max(50),
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")),
    role:joi.string().optional().valid("student", "admin", "teacher").default("student")
})



export const LoginSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")))
})

