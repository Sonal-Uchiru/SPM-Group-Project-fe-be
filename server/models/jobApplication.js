import extendSchema from "mongoose-extend-schema"
import mongoose from 'mongoose'
import baseEntity from './base.js'
import jwt from "jsonwebtoken";

const jobApplicationSchema = extendSchema(baseEntity, {
    name: {type: String, required: true},

});

jobApplicationSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
        expiresIn: '7d',
    })
};

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export {JobApplication};