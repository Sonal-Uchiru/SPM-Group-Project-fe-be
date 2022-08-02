import bcrypt from 'bcrypt'
import Joi from 'joi'
import {Admin} from '../models/admin.js'
import {Student} from '../models/student.js'
import {Staff} from '../models/staff.js'
import {currentDateAndTIme} from '../validations/dateAndTime.js'
import passwordComplexity from 'joi-password-complexity'

export async function changePassword(req, res) {
    try {
        const {error} = validate(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const password = await encryptPassword(req.body.password)

        let user = await Student.findOne({email: req.body.email})
        if (user) {
            await Student.findByIdAndUpdate(user.id, {
                password,
                modified_date: currentDateAndTIme(),
            })
            return res.status(200).send({
                message: 'Password Changed Successfully',
            })
        }

        user = await Staff.findOne({email: req.body.email})
        if (user) {
            await Student.findByIdAndUpdate(user.id, {
                password,
                modified_date: currentDateAndTIme(),
            })
            return res.status(200).send({
                message: 'Password Changed Successfully',
            })
        }

        return res.status(404).send({message: 'user not found'})
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export async function isUserExist(req, res) {
    try {
        const {error} = validateEmail(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        let user = await Student.findOne({email: req.body.email})
        if (user) {
            return res.status(200).send({message: 'user exists'})
        }

        user = await Staff.findOne({email: req.body.email})
        if (user) {
            return res.status(200).send({message: 'user exists'})
        }
        return res.status(404).send({message: 'user not found'})
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    })
    return schema.validate(data)
}

const encryptPassword = async (data) => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    return await bcrypt.hash(data, salt)
}

const validateEmail = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
    })
    return schema.validate(data)
}
