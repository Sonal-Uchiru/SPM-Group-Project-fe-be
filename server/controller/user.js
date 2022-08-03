import express from 'express'
import {getUserById} from "../service/user.js";

const userRouter = express.Router()

userRouter.get('/', getUserById)

export {userRouter}