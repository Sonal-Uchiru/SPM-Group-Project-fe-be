import express from 'express'
import bcrypt from 'bcrypt'
import {User} from "../models/user.js";
import {validateAuth} from "../validations/auth.js";


const authRouter = express.Router()

authRouter.post('/', async (req, res) => {
    try {
        const {error} = validateAuth(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        let user = await User.findOne({email: req.body.email})
        if (user) {
            await authenticateCredentials(req, res, user, user.role)
            return
        }
        return res.status(401).send({message: 'Invalid Email or Password'})
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
})

// update the validations router to login admin and the company

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