import mongoose from 'mongoose'
import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'
import jwt from 'jsonwebtoken'
import {currentDateAndTIme} from '../validations/dateAndTime.js'

const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: {type: String, required: true},
    student_id: {type: String, required: true},
    email: {type: String, required: true},
    phone_number: {type: String, required: true},
    faculty: {type: String, required: true},
    profile_image_url: {type: String, required: true},
    degree_program: {type: String, required: true},
    password: {type: String, required: true},
    group_id: {type: String, required: false, default: null},
    created_date: {type: String, required: true, default: currentDateAndTIme()},
    modified_date: {type: String, required: false},
    modified_user: {type: String, required: false},
    status: {type: Number, required: true, in: [0, 1], default: 0},
})

studentSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
        expiresIn: '7d',
    })
}

const Student = mongoose.model('student', studentSchema)

const validate = (studentData) => {
    const schema = Joi.object({
        name: Joi.string().required().label('Name with initials'),
        student_id: Joi.string().required().label('Student ID'),
        email: Joi.string().email().required().label('Email'),
        phone_number: Joi.string()
            .min(10)
            .max(10)
            .required()
            .label('Phone Number'),
        faculty: Joi.string().required().label('Faculty'),
        profile_image_url: Joi.string().required().label('Profile Image'),
        degree_program: Joi.string().required().label('Degree Program'),
        password: passwordComplexity().required().label('Password'),
    })
    return schema.validate(studentData)
}

export {Student, validate}
