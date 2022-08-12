import passwordComplexity from 'joi-password-complexity'
import Joi from "joi";

export const validatePost = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(50).required().label('Company Name'),
        logo: Joi.string().required().label('Company Logo'),
        email: Joi.string().email().max(100).required().label('Email'),
        address:Joi.string().max(200).required().label('Company Address'),
        field:Joi.string().required().label('Field'),
        password: passwordComplexity().required().label('Password'),
        mobile: Joi.number().required().label('Phone Number'),
        siteUrl:Joi.string().uri().label('Site Url')
    })
    return schema.validate(data)
}



export const validateUpdate = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(50).required().label('Company Name'),
        logo: Joi.string().required().label('Company Logo'),
        email: Joi.string().email().max(100).required().label('Email'),
        address:Joi.string().max(200).required().label('Company Address'),
        field:Joi.string().required().label('Field'),
        mobile: Joi.number().required().label('Phone Number'),
        siteUrl:Joi.string().uri().label('Site Url'),
        moto:Joi.string().max(100).label('Moto'),
        description:Joi.string().max(100).label('Description'),
        coverImage:Joi.string().label('Cover Image'),
    })
    return schema.validate(data)
}