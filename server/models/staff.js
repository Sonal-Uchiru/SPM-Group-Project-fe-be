import mongoose from 'mongoose'
import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'
import jwt from 'jsonwebtoken'
import {currentDateAndTIme} from '../validations/dateAndTime.js'

const Schema = mongoose.Schema

const staffSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    phone_number: {type: String, required: true},
    faculty: {type: String, required: true},
    department: {type: String, required: true},
    profile_image_url: {type: String, required: true},
    academic_rank: {type: String, required: true},
    research_fields: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'Staff'},
    panel_id: {type: String, required: false, default: null},
    created_date: {type: String, required: true, default: currentDateAndTIme()},
    modified_date: {type: String, required: false},
    modified_user: {type: String, required: false},
    status: {type: Number, required: true, in: [0, 1], default: 0},
})

staffSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
        expiresIn: '7d',
    })
}

const Staff = mongoose.model('staff', staffSchema)

const validate = (staffData) => {
    const schema = Joi.object({
        first_name: Joi.string().required().label('First Name'),
        last_name: Joi.string().required().label('Last Name'),
        username: Joi.string().required().label('Username'),
        email: Joi.string().email().required().label('Email'),
        phone_number: Joi.string()
            .min(10)
            .max(10)
            .required()
            .label('Phone Number'),
        faculty: Joi.string().required().label('Faculty'),
        department: Joi.string().required().label('Department'),
        profile_image_url: Joi.string().required().label('Profile Image'),
        academic_rank: Joi.string().required().label('Academic Rank'),
        research_fields: Joi.string().required().label('Research Fields'),
        password: passwordComplexity().required().label('Password'),
    })
    return schema.validate(staffData)
}

export {Staff, validate}
