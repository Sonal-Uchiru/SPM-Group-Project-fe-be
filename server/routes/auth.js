import express from 'express'
import bcrypt from 'bcrypt'
import Joi from 'joi'
import {Student} from '../models/student.js'
import {Staff} from '../models/staff.js'
import {Admin} from '../models/admin.js'

const authRouter = express.Router()

authRouter.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        let user = await Student.findOne({email: req.body.email})
        if (user) {
            await authenticateCredentials(req, res, user, 'student')
            return
        }

        user = await Staff.findOne({email: req.body.email})
        if (user) {
            await authenticateCredentials(req, res, user, 'staff')
            return
        }

        user = await Admin.findOne({email: req.body.email})
        if (user) {
            const isPasswordValid = user.password === req.body.password
            if (isPasswordValid) {
                const token = await user.generateAuthToken()
                return res.status(200).send({
                    token,
                    message: 'logged in successfully',
                    role: 'admin',
                })
            }

            return res.status(401).send({message: 'Invalid Email or Password'})
        }

        return res.status(401).send({message: 'Invalid Email or Password'})
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
})

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password'),
    })
    return schema.validate(data)
}

const authenticateCredentials = async (req, res, user, role) => {
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword)
        return res.status(401).send({message: 'Invalid Email or Password'})

    const token = await user.generateAuthToken()
    res.status(200).send({
        token,
        message: 'logged in successfully',
        role,
    })
}

export default authRouter
