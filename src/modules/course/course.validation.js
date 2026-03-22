import joi from "joi"


export const addCourseSchema = joi.object({
    title:joi.string().required().min(3).max(100),
    description:joi.string().required().min(3).max(100),
    price:joi.number().required().min(0),
    category:joi.string().required().min(3).max(100),
})

export const updateCourseSchema = joi.object({
    title:joi.string().optional().min(3).max(100),
    description:joi.string().optional().min(3).max(100),
    price:joi.number().optional().min(0),
    category:joi.string().optional().min(3).max(100)
})