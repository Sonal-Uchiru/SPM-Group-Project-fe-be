import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'

const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
        expiresIn: '7d',
    })
}

const User = mongoose.model('user', userSchema)

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    })
    return schema.validate(data)
}

export {User, validate}