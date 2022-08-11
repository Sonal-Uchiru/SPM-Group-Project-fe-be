import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'

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
        otherRequirements: Joi.string().max(200).label('Other Requirements'),
        companyId: Joi.string().required().label('Company Id'),
    })
    return schema.validate(data)
}
