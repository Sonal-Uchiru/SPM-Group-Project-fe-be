import passwordComplexity from 'joi-password-complexity'
import Joi from "joi";

export const validatePost = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
        role: Joi.string().required().label('Role'),
        mobile: Joi.number().required().label('Phone Number'),
    })
    return schema.validate(data)
}

export const validationUpdate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
        role: Joi.string().required().label('Role'),
        mobile: Joi.number().required().label('Phone Number'),
        aboutMe: Joi.string().label('About Me'),
        address: Joi.string().label('Address'),
        gender: Joi.string().label('Gender'),
        dob: Joi.string().label('Date of Birth'),
        profilePicture: Joi.string().label('Profile Picture'),
    })
    return schema.validate(data)
}


export const validationDelete = (data) => {
    const schema = Joi.object({
        password: passwordComplexity().required().label('Password')
    })
    return schema.validate(data)
}