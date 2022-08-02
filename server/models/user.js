import extendSchema from "mongoose-extend-schema"
import mongoose from 'mongoose'
import baseEntity from './base.js'

const Schema = mongoose.Schema

const userSchema = extendSchema(baseEntity, {
    name: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

const User = mongoose.model("User", userSchema);

export {User};