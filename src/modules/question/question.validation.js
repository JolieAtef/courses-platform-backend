import joi from "joi"

export const addQuestionSchema = joi.object({
    text:joi.string().required().min(10),
    options:joi.array().items(joi.string()).required().min(2),
    correctAnswerIndex:joi.number().integer().required().min(1).custom((value, helpers) => {
        const options = helpers?.state.ancestors[0]?.options
        if (value < 1 || value >= options.length) {
          return helpers.message(
            `"correctAnswerIndex" must be between 1 and ${options.length}`
          );
        }
        return value; 
      })
})

export const updateQuestionSchema = joi.object({
    text:joi.string().optional().min(10),
    options:joi.array().items(joi.string()).optional().min(2),
    correctAnswerIndex:joi.number().integer().optional().min(1).custom((value, helpers) => {
        const options = helpers?.state.ancestors[0]?.options
        if (value < 1 || value >= options.length) {
          return helpers.message(
            `"correctAnswerIndex" must be between 1 and ${options.length}`
          );
        }
        return value; 
      })
})

export const submitQuestionsSchema = joi.array().items(
    joi.object({
        questionId:joi.string().required(),
        answer:joi.number().integer().required()
    }).min(1).required()
)

