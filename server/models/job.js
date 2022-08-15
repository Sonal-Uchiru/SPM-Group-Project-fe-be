import extendSchema from "mongoose-extend-schema"
import mongoose from 'mongoose'
import baseEntity from './base.js'
import jwt from "jsonwebtoken";

const jobSchema = extendSchema(baseEntity, {
    name: {type: String, required: true},

});

jobSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
        expiresIn: '7d',
    })
};

const Job = mongoose.model("Job", jobSchema);

export {Job};