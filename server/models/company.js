import extendSchema from 'mongoose-extend-schema'
import mongoose from 'mongoose'
import baseEntity from './base.js'
import jwt from 'jsonwebtoken'

const companySchema = extendSchema(baseEntity, {
    name: {type: String, required: true},
    logo: {type: String, required: false},
    coverImage: {type: String, required: false},
    address: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    mobile: {type: Number, required: true},
    description: {type: String, required: false},
    field: {type: String, required: true},
    moto: {type: String, required: false},
    siteUrl: {type: String, required: false},
})

companySchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
        expiresIn: '7d',
    })
}

const Company = mongoose.model('Company', companySchema)

export {Company}
