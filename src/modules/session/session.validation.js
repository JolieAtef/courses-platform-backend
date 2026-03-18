
import joi from "joi"

export const addSessionSchema = joi.object({
    title:joi.string().required().min(3).max(100),
    order:joi.number().required().min(1),
    filePath:joi.string().required(),
    contentType:joi.string().valid("video","pdf"),
    duration:joi.number().required().min(0)
})