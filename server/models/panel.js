import mongoose from 'mongoose'
import {currentDateAndTIme} from '../validations/dateAndTime.js'
import Joi from 'joi'

const Schema = mongoose.Schema;
const panelSchema = new Schema({
    name: {type: String, required: true},
    panel_type: {type: String, required: true},
    research_field: {type: String, required: true},
    faculty: {type: String, required: true},
    in_charge_id: {type: String, required: false},
    create_date: {type: Date, required: true, default: currentDateAndTIme()},
    modified_date: {type: Date, required: false},
    modified_user: {type: String, required: false},
    status: {type: Number, required: true, in: [0, 1], default: 0}
})

const Panel = mongoose.model("panel", panelSchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label('Panel Scheme Name'),
        panel_type: Joi.string().required().label('Panel Type'),
        research_field: Joi.string().required().label('Research Fields'),
        in_charge_id: Joi.string().required().label('Panel Incharge'),
        faculty: Joi.string().required().label('Panel Faculty'),
        member_array: Joi.required().label('Member array'),
        status: Joi.number().required().label('Panel Faculty'),

    })
    return schema.validate(data)
}

export {Panel, validate};
