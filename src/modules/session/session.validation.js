
import joi from "joi"

export const addSessionSchema = joi.object({
    title:joi.string().required().min(3).max(100),
    filePath:joi.string().required(),
    contentType:joi.string().valid("video","pdf"),
    duration:joi.number().required().min(0)
})