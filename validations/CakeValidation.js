import Joi from 'joi'

export const addCakeValid = (_reqBody) => {
    const validation = Joi.object({
        type: Joi.string().required().min(2).max(25),
        price: Joi.number().required().min(0).max(99999),
        category: Joi.string().required().min(2).max(25)
    })

    return validation.validate(_reqBody)
}
export const updateCakeValid = (_reqBody) => {
    const validation = Joi.object({
        type: Joi.string().allow().min(2).max(25),
        price: Joi.number().allow().min(0).max(99999),
        category: Joi.string().allow().min(2).max(25)
    })

    return validation.validate(_reqBody)
}