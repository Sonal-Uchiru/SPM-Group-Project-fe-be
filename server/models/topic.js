import mongoose from 'mongoose'
import Joi from 'joi'
import {currentDateAndTIme} from '../validations/dateAndTime.js'

const Schema = mongoose.Schema

const topicSchema = new Schema({
    title: {type: String, required: true},
    research_field: {type: String, required: true},
    description: {type: String, required: true},
    student_group_id: {type: String, required: true},
    is_approved: {type: Number, required: true, default: 0, in: [0, 1, 2]},
    created_date: {
        type: String,
        required: true,
        default: currentDateAndTIme(),
    },
    modified_date: {type: String, required: false},
    modified_user: {type: String, required: false},
    status: {type: Number, required: true, default: 0, in: [0, 1]},
})

const Topic = mongoose.model('topic', topicSchema)

const validate = (topicData) => {
    const schema = Joi.object({
        title: Joi.string().required().label('Title'),
        research_field: Joi.string().required().label('Research Field'),
        description: Joi.string().required().label('Description'),
        student_group_id: Joi.string().required().label('Student Group ID'),
    })
    return schema.validate(topicData)
}

export {Topic, validate}
