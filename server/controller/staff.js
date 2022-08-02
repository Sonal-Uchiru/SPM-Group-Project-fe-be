import express from 'express'
import {
    adminDeleteStaff, adminUpdateStaff, changePassword,
    createStaff, deleteStaff,
    getAllStaff,
    getOneStaff,
    getStaffByPanel,
    updateStaff,
} from '../service/staff.js'


const staffRouter = express.Router()

staffRouter.post('/signup', async (req, res) => {
    await createStaff(req, res)
})

staffRouter.get('/get', async (req, res) => {
    await getAllStaff(req, res)
})

staffRouter.get('/', async (req, res) => {
    await getOneStaff(req, res)
})

staffRouter.get('/:id', async (req, res) => {
    await getStaffByPanel(req, res)
})

staffRouter.patch('/', async (req, res) => {
    await updateStaff(req, res)
})

staffRouter.put('/:id', async (req, res) => {
    await adminUpdateStaff(req, res)
})

staffRouter.patch('/password', async (req, res) => {
    await changePassword(req, res)
})

staffRouter.delete('/', async (req, res) => {
    await deleteStaff(req, res)
})

staffRouter.delete('/:id', async (req, res) => {
    await adminDeleteStaff(req, res)
})

export default staffRouter
