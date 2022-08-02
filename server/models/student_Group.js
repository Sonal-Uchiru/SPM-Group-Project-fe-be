import mongoose from 'mongoose'
import Joi from 'joi'
import {currentDateAndTIme} from '../validations/dateAndTime.js'

const Schema = mongoose.Schema

const studentGroupSchema = new Schema({
    group_id: {type: String, required: true},
    faculty: {type: String, required: true},
    group_leader_id: {type: String, required: true},
    supervisor_id: {type: String},
    co_supervisor_id: {type: String},
    evaluation_panel_id: {type: String},
    presentation_panel_id: {type: String},
    topic_id: {type: String},
    created_date: {
        type: String,
        required: true,
        default: currentDateAndTIme(),
    },
    modified_date: {type: String, required: false},
    modified_user: {type: String, required: false},
    status: {type: Number, required: true, default: 0, in: [0, 1]},
})

const StudentGroup = mongoose.model('studentGroup', studentGroupSchema)
const validate = (studentGroupData) => {
    const schema = Joi.object({
        group_id: Joi.string().required().label('Group ID'),
        faculty: Joi.string().required().label('Faculty'),
        group_leader_id: Joi.string().required().label('Group Leader ID'),
        students_array: Joi.required().label('Student Array'),
    })
    return schema.validate(studentGroupData)
}

export {StudentGroup, validate}
