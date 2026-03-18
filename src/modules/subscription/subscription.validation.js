import joi from "joi"

export const subscribeSchema = joi.object({
    cardNumber:joi.string().pattern(/^\d{16}$/).optional()
})