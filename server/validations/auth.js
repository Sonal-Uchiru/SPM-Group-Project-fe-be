import Joi from "joi";

export const validateAuth = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password'),
    })
    return schema.validate(data)
}