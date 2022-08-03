import extendSchema from "mongoose-extend-schema"
import mongoose from 'mongoose'
import baseEntity from './base.js'
import jwt from "jsonwebtoken";

const companySchema = extendSchema(baseEntity, {
    name: {type: String, required: true},

})

companySchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
        expiresIn: '7d',
    })
};

const Company = mongoose.model("Company", companySchema);

export {Company};