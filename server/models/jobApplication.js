import extendSchema from "mongoose-extend-schema"
import mongoose from 'mongoose'
import baseEntity from './base.js'

const jobApplicationSchema = extendSchema(baseEntity, {
    applicant: {type: String, required: true},
    jobId: {type: String, required: true},
    companyId: {type: String, required: true},
    applicantOtherDetails: {
        dob: {type: Date, required: false},
        address: {type: String, required: false},
        postalCode: {type: Number, required: false},
        gender: {type: String, required: false},
    },
    resume: {type: String, required: true},
    coverLetter: {type: String, required: false},
    title: {type: String, required: true, enum: ['Mr.', 'Ms.', 'Miss', 'Dr.', 'Prof.']},
    preferredName: {type: String, required: false},
    // true -> yes | false -> no
    companyWorked: {type: Boolean, required: true},
    // true -> yes | false -> no
    employedWithCurrentCompany: {type: Boolean, required: true},
    portfolioLink: {type: String, required: false},
    status: {type: Number, required: false, default: 0},
    licensesAndCertificates: [{type: String, required: false}],
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export {JobApplication};
