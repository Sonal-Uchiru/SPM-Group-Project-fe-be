import express from 'express'
import {User, validate} from '../models/user.js'
import bcrypt from 'bcrypt'
import {decode} from '../middleware/tokenDecode.js'

const userRouter = express.Router()

userRouter.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const user = await User.findOne({email: req.body.email})
        if (user)
            return res
                .status(409)
                .send({message: 'User with given email already Exist!'})

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        await new User({...req.body, password: hashPassword}).save()
        res.status(201).send({message: 'User created successfully'})
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
})

userRouter.get('/', async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    console.log(decode(req))
    if (user) {
        return res.status(200).json(user)
    }
    return res.status(404).send({message: 'user not found'})
})

export default userRouter
