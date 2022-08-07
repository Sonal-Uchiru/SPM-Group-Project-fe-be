import express from 'express'
import {getUser} from "../service/user.js";

const userRouter = express.Router()

userRouter.get('/', getUser)

export {userRouter}