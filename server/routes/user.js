import {saveUser} from "../service/user.js";
import express from "express";

const userRouter = express.Router()

userRouter.post('/', saveUser)


export {userRouter}