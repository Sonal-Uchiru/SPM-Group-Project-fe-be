import Joi from "joi";

export const validate = (data) => {
    const schema = Joi.object({
        jobId: Joi.string().required().label('job id'),
        applicantOtherDetails: Joi.any().optional().label('applicant other details'),
        resume: Joi.string().required().label('resume'),
        coverLetter: Joi.string().optional().label('cover letter').truncate(true),
        title: Joi.string().valid('Mr.', 'Ms.', 'Miss', 'Dr.', 'Prof.').required().label('title'),
        preferredName: Joi.string().min(3).max(10).optional().label('preferred name').truncate(true),
        // true -> yes | false -> no
        companyWorked: Joi.boolean().required().label('company worked'),
        // true -> yes | false -> no
        employedWithCurrentCompany: Joi.boolean().required().label('employed with current company'),
        portfolioLink: Joi.string().optional().label('portfolio link').truncate(true),
        licensesAndCertificates: Joi.array().optional().label('licenses and certificates'),
    })
    return schema.validate(data)
}

export const validationStatusChange = (data) => {
    const schema = Joi.object({
        status: Joi.number().valid(0, 1, 2).required().label('status'),
    })
    return schema.validate(data)
}