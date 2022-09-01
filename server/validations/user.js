import passwordComplexity from 'joi-password-complexity'
import Joi from "joi";

export const validatePost = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().max(50).required().label('First Name'),
        lastName: Joi.string().max(50).required().label('Last Name'),
        email: Joi.string().email().max(100).required().label('Email'),
        password: passwordComplexity().required().label('Password'),
        role: Joi.string().required().label('Role'),
        mobile: Joi.number().integer().required().label('Phone Number'),
    })
    return schema.validate(data)
}

export const validationUpdate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().max(50).required().label('First Name'),
        lastName: Joi.string().max(50).required().label('Last Name'),
        email: Joi.string().email().max(100).required().label('Email'),
        password: Joi.string().label('Password'),
        role: Joi.string().label('Role'),
        mobile: Joi.number().integer().required().label('Phone Number'),
        aboutMe: Joi.string().max(200).label('About Me'),
        address: Joi.string().max(200).label('Address'),
        gender: Joi.string().label('Gender'),
        dob: Joi.string().label('Date of Birth'),
        profilePicture: Joi.string().label('Profile Picture'),
    })
    return schema.validate(data)
}


export const validationDelete = (data) => {
    const schema = Joi.object({
        password: Joi.string().required().label('Password')
    })
    return schema.validate(data)
}
