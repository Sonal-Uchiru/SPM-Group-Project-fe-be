import express from 'express'
import {changePassword, isUserExist} from '../service/password_recovery.js'

const passwordRecoveryRouter = express.Router()

passwordRecoveryRouter.patch('/', async (req, res) => {
    await changePassword(req, res)
})

passwordRecoveryRouter.post('/', async (req, res) => {
    await isUserExist(req, res)
})

export default passwordRecoveryRouter
