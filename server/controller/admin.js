import express from 'express'
import {getAdminById} from '../service/admin.js'

const adminRouter = express.Router()

adminRouter.get('/', async (req, res) => {
    await getAdminById(req, res)
})

export default adminRouter
