import express from 'express'
import {
    createGroup,
    getAllStudentGroups,
    getStudentGroupByID,
    getAllStudentGroupsByStaffID,
    getAllGroupsWithoutPanels,
    updateStudentGroup,
    getStudentGroupRequestsByID
} from '../service/student_group.js'

const studentGroupRouter = express.Router()

studentGroupRouter.post('/', async (req, res) => {
    await createGroup(req, res)
})

studentGroupRouter.get('/', async (req, res) => {
    await getAllStudentGroups(res)
})

studentGroupRouter.get('/:id', async (req, res) => {
    await getStudentGroupByID(req, res)
})

studentGroupRouter.get('/staffs/:id', async (req, res) => {
    await getAllStudentGroupsByStaffID(req, res)
})

studentGroupRouter.get('/requests/:id', async (req, res) => {
    await getStudentGroupRequestsByID(req, res)
})


studentGroupRouter.get('/panels/', async (req, res) => {
    await getAllGroupsWithoutPanels(req, res)
})

studentGroupRouter.patch('/:id', async (req, res) => {
    await updateStudentGroup(req, res)
})

export default studentGroupRouter
