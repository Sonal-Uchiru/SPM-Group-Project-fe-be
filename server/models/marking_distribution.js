import mongoose from 'mongoose'
import Joi from 'joi'
import {currentDateAndTIme} from '../validations/dateAndTime.js'

const Schema = mongoose.Schema

const markingDistributionSchema = new Schema({
    criteria: {type: String, required: true},
    mark: {type: Number, required: true},
    marking_scheme_id: {type: String, required: true},
    created_date: {
        type: String,
        required: true,
        default: currentDateAndTIme(),
    },
    modified_date: {type: String, required: false},
    modified_user: {type: String, required: false},
})

const MarkingDistribution = mongoose.model('markingDistribution', markingDistributionSchema)

const validate = (data) => {
    const schema = Joi.object({
        criteria: Joi.string().required().label('Criteria'),
        mark: Joi.number().required().label('Criteria Mark'),
        marking_scheme_id: Joi.string().required().label('Marking Schema ID'),
    })
    return schema.validate(data)
}

export {MarkingDistribution, validate}
