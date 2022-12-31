import Joi from 'joi'

export const addUserValid = (_reqBody) => {
    const validation = Joi.object({
        name: Joi.string().required().min(2).max(25),
        age: Joi.number().required().min(0).max(120),
        country: Joi.string().required().min(2).max(25)
    })

    return validation.validate(_reqBody)
}
export const updateUserValid = (_reqBody) => {
    const validation = Joi.object({
        name: Joi.string().allow().min(2).max(25),
        age: Joi.number().allow().min(0).max(120),
        country: Joi.string().allow().min(2).max(25)
    })

    return validation.validate(_reqBody)
}