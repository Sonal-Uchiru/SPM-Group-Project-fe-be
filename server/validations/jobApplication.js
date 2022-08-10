import Joi from "joi";

export const validatePost = (data) => {
    const schema = Joi.object({
        jobId: Joi.string().required().label('job id'),
        resume: Joi.string().required().label('resume'),
        coverLetter: Joi.string().label('cover letter'),
        title: Joi.string().required().label('title').validate(['Mr.', 'Ms.', 'Miss', 'Dr.', 'Prof.']),
        preferredName: Joi.string().label('preferred name').trim(true),
        // true -> yes | false -> no
        companyWorked: Joi.boolean().required().label('company worked'),
        // true -> yes | false -> no
        employedWithCurrentCompany: Joi.boolean().required().label('employed with current company'),
        portfolioLink: Joi.string().label('portfolio link'),
        licensesAndCertificates: Joi.array().label('licenses and certificates'),
    })
    return schema.validate(data)
}