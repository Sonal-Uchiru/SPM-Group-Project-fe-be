import express from 'express'
import {deleteUser, getAllUsers, getUser, updateUser} from "../service/user.js";

const userRouter = express.Router()

userRouter.get('/', getUser)
userRouter.get('/list', getAllUsers)
userRouter.put('/', updateUser)
userRouter.delete('/', deleteUser)

export {userRouter}