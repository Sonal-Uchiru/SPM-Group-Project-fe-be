import mongoose from 'mongoose'
import {currentDateAndTIme} from '../validations/dateAndTime.js'
import Joi from 'joi'

const Schema = mongoose.Schema;
const studentSubmissionSchema = new Schema({
    submission_type_id: {type: String, required: true},
    student_group_id: {type: String, required: true},
    document_link: {type: String, required: true},
    faculty: {type: String, required: true},
    create_date: {type: Date, required: true, default: currentDateAndTIme()},
    modified_date: {type: Date, required: false},
    modified_user: {type: String, required: false},
    status: {type: Number, required: true, default: 1}
})

const StudentSubmission = mongoose.model("studentsubmission", studentSubmissionSchema);

const validate = (data) => {
    const schema = Joi.object({
        submission_type_id: Joi.string().required().label('Submission Type ID'),
        student_group_id: Joi.string().required().label('Student Group ID'),
        document_link: Joi.string().required().label('Document Link'),
        faculty: Joi.string().required().label('Panel Incharge'),
        status: Joi.number().required().label('Panel Faculty'),

    })
    return schema.validate(data)
}

export {StudentSubmission, validate};