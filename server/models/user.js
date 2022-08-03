import extendSchema from "mongoose-extend-schema"
import mongoose from 'mongoose'
import baseEntity from './base.js'
import jwt from "jsonwebtoken";

const userSchema = extendSchema(baseEntity, {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    mobile: {type: Number, required: true},
    aboutMe: {type: String, required: false},
    address: {type: String, required: false},
    gender: {type: String, required: false},
    dob: {type: String, required: false},
    profilePicture: {type: String, required: false},
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
        expiresIn: '7d',
    })
};

const User = mongoose.model("User", userSchema);

export {User};