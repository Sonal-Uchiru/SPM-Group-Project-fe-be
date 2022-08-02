import express from 'express'
import {
    createRequest,
    getAllRequests,
    getRequestByID,
    getAllRequstsByStaffID,
    deleteRequest,
} from '../service/request.js'

const requestRouter = express.Router()

requestRouter.post('/', async (req, res) => {
    await createRequest(req, res)
})

requestRouter.get('/', async (req, res) => {
    await getAllRequests(res)
})

requestRouter.get('/:id', async (req, res) => {
    await getRequestByID(req, res)
})

requestRouter.get('/staffs/:id', async (req, res) => {
    await getAllRequstsByStaffID(req, res)
})

requestRouter.delete('/:id', async (req, res) => {
    await deleteRequest(req, res)
})

export default requestRouter
