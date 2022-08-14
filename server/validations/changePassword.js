import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const validate = (data) => {
    const schema = Joi.object({
        password: Joi.string().required().label('Current Password'),
        newPassword: passwordComplexity().required().label('New Password'),
    })
    return schema.validate(data)
}
