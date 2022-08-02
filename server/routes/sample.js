import express from 'express'
import {User} from '../models/user.js'


const userRouter = express.Router()

userRouter.post('/', async (req, res) => {
    try {

        const user = await new User(req.body).save()
        res.status(201).send({
            user,
            message: 'user added successfully',
        })

    } catch (e) {
        console.log(e)
    }
})

export {userRouter}