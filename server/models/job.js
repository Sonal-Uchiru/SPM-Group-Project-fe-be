import extendSchema from 'mongoose-extend-schema'
import mongoose from 'mongoose'
import baseEntity from './base.js'
import jwt from 'jsonwebtoken'

const jobSchema = extendSchema(baseEntity, {
    jobId: { type: String, required: true },
    position: { type: String, required: true },
    developmentArea: { type: String, required: true },
    jobType: { type: String, required: true },
    roleOverview: { type: String, required: true },
    responsibilities: { type: String, required: true },
    requirements: { type: String, required: true },
    otherRequirements: { type: String, required: false },
    companyId: { type: String, required: true },
    status: { type: Number, required: true, default: 1 },
})

jobSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: '7d',
    })
}

const Job = mongoose.model('Job', jobSchema)

export { Job }
