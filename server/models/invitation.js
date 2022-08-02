import mongoose from 'mongoose'
import Joi from 'joi'
import {currentDateAndTIme} from '../validations/dateAndTime.js'

const Schema = mongoose.Schema

const invitationSchema = new Schema({
    staff_id: {type: String, required: true},
    topic_id: {type: String, required: true},
    created_date: {
        type: String,
        required: true,
        default: currentDateAndTIme(),
    },
    modified_date: {type: String, required: false},
    modified_user: {type: String, required: false},
})

const Invitation = mongoose.model('invitation', invitationSchema)

const validate = (invitationData) => {
    const schema = Joi.object({
        staff_id: Joi.string().required().label('Staff ID'),
        topic_id: Joi.string().required().label('Topic ID'),
    })
    return schema.validate(invitationData)
}

export {Invitation, validate}
