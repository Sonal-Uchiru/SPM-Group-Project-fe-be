import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'

export const validatePost = (data) => {
    const schema = Joi.object({
        jobId: Joi.string().required().label('Job Id'),
        position: Joi.string().required().label('Position'),
        developmentArea: Joi.string().required().label('Development Area'),
        jobType: Joi.string().required().label('Job Type'),
        roleOverview: Joi.string().required().label('Role Overview'),
        responsibilities: Joi.string().required().label('Responsibilities'),
        requirements: Joi.string().required().label('Requirements'),
        otherRequirements: Joi.string().label('Other Requirements'),
        companyId: Joi.string().required().label('Company Id'),
    })
    return schema.validate(data)
}

export const updatePost = (data) => {
    const schema = Joi.object({
        position: Joi.string().required().label('Position'),
        developmentArea: Joi.string().required().label('Development Area'),
        jobType: Joi.string().required().label('Job Type'),
        roleOverview: Joi.string().required().label('Role Overview'),
        responsibilities: Joi.string().required().label('Responsibilities'),
        requirements: Joi.string().required().label('Requirements'),
        otherRequirements: Joi.string().label('Other Requirements'),
        companyId: Joi.string().required().label('Company Id'),
    })
    return schema.validate(data)
}
