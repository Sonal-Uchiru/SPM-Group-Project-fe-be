import Joi from 'joi'

export const validatePost = (data) => {
    const schema = Joi.object({
        position: Joi.string().max(100).required().label('Position'),
        developmentArea: Joi.string()
            .max(100)
            .required()
            .label('Development Area'),
        jobType: Joi.string()
            .required()
            .valid('Full time', 'Part time')
            .label('Job Type'),
        roleOverview: Joi.string().max(200).required().label('Role Overview'),
        responsibilities: Joi.string()
            .max(200)
            .required()
            .label('Responsibilities'),
        requirements: Joi.string().max(200).required().label('Requirements'),
        otherRequirements: Joi.string()
            .max(200)
            .optional()
            .label('Other Requirements'),
    })
    return schema.validate(data)
}

export const validatePut = (data) => {
    const schema = Joi.object({
        position: Joi.string().max(100).required().label('Position'),
        developmentArea: Joi.string()
            .max(100)
            .required()
            .label('Development Area'),
        jobType: Joi.string()
            .required()
            .valid('Full time', 'Part time')
            .label('Job Type'),
        roleOverview: Joi.string().max(200).required().label('Role Overview'),
        responsibilities: Joi.string()
            .max(200)
            .required()
            .label('Responsibilities'),
        requirements: Joi.string().max(200).required().label('Requirements'),
        otherRequirements: Joi.string()
            .max(200)
            .optional()
            .label('Other Requirements'),
        status: Joi.number().required().valid(1, 2).label('Status'),
    })
    return schema.validate(data)
}
