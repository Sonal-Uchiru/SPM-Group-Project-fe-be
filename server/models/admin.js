import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const Schema = mongoose.Schema
const adminSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    created_date: {type: String, required: false},
    status: {type: Number, required: true, in: [0, 1], default: 0},
})

adminSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
        expiresIn: '7d',
    })
}


const Admin = mongoose.model('admin', adminSchema)

export {Admin}
