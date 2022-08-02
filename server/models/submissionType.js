import mongoose from 'mongoose'
import Joi from 'joi'
import {currentDateAndTIme} from '../validations/dateAndTime.js'


const Schema = mongoose.Schema;
const submissionTypeSchema = new Schema({
    assignment_name: {type: String, required: true},
    guidelines: {type: String, required: true},
    documents_links: [{type: String, required: true}],
    faculty: {type: String, required: true},
    type: {type: String, required: true},
    deadline: {type: Date, required: true},
    marking_scheme_id: {type: String, required: true},
    create_date: {type: Date, required: true, default: currentDateAndTIme()},
    modified_date: {type: Date, required: false},
    modified_user: {type: String, required: false},
    status: {type: Number, required: true, default: 0}
})

const SubmissionType = mongoose.model("submissiontype", submissionTypeSchema);

const validate = (data) => {
    const schema = Joi.object({
        assignment_name: Joi.string().required().label('Assignment Name'),
        guidelines: Joi.string().required().label('Guidelines'),
        documents_links: Joi.required().label('Document Links'),
        faculty: Joi.string().required().label('Submission Faculty'),
        type: Joi.string().required().label('Submission Type'),
        deadline: Joi.string().required().label('Submission Deadline'),
        marking_scheme_id: Joi.string().required().label('Marking Scheme ID'),
        status: Joi.number().required().label('Submission Status'),

    })
    return schema.validate(data)
}


export {SubmissionType, validate};