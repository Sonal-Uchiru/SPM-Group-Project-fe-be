import mongoose from 'mongoose'
import Joi from 'joi'
import {currentDateAndTIme} from '../validations/dateAndTime.js'

const Schema = mongoose.Schema

const requestSchema = new Schema({
    staff_id: {type: String, required: true},
    topic_id: {type: String, required: true},
    type: {type: Number, required: true, default: 0, in: [0, 1]},
    created_date: {
        type: String,
        required: true,
        default: currentDateAndTIme(),
    },
    modified_date: {type: String, required: false},
    modified_user: {type: String, required: false},
})

const Request = mongoose.model('request', requestSchema)

const validate = (requestData) => {
    const schema = Joi.object({
        staff_id: Joi.string().required().label('Staff ID'),
        topic_id: Joi.string().required().label('Topic ID'),
        type: Joi.number().required().label('Type')
    })
    return schema.validate(requestData)
}

export {Request, validate}
