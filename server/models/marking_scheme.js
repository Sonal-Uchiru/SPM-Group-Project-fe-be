import mongoose from 'mongoose'
import Joi from 'joi'
import {currentDateAndTIme} from '../validations/dateAndTime.js'

const Schema = mongoose.Schema

const markingSchema = new Schema({
    name: {type: String, required: true},
    faculty: {type: String, required: true},
    total_marks: {type: Number, required: true},
    created_date: {
        type: String,
        required: true,
        default: currentDateAndTIme(),
    },
    modified_date: {type: String, required: false},
    modified_user: {type: String, required: false},
    status: {type: Number, required: true, in: [0, 1], default: 0},
})

const MarkingScheme = mongoose.model('markingScheme', markingSchema)

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label('Marking Scheme Name'),
        faculty: Joi.string().required().label('Faculty'),
        total_marks: Joi.number().required().label('Total Marks'),
    })
    return schema.validate(data)
}

export {MarkingScheme, validate}
