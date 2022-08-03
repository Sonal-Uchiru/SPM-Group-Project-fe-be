import mongoose from 'mongoose'

const Schema = mongoose.Schema
const baseEntitySchema = new Schema({
    createdDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    updatedDate: {
        type: Date,
        required: true,
        default: new Date()
    }
})


export default baseEntitySchema