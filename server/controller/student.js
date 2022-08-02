import express from 'express'
import {
    adminDeleteStudent, adminUpdateStudent, changePassword,
    createStudent, deleteStudent,
    getAllStudents,
    getOneStudent,
    getStudentsByGroup, updateStudent,
} from '../service/student.js'


const studentRouter = express.Router()

studentRouter.post('/signup', async (req, res) => {
    await createStudent(req, res)
})

studentRouter.get('/get', async (req, res) => {
    await getAllStudents(req, res)
})

studentRouter.get('/', async (req, res) => {
    await getOneStudent(req, res)
})

studentRouter.get('/:id', async (req, res) => {
    await getStudentsByGroup(req, res)
})

studentRouter.patch('/', async (req, res) => {
    await updateStudent(req, res)
})

studentRouter.put('/:id', async (req, res) => {
    await adminUpdateStudent(req, res)
})

studentRouter.patch('/password', async (req, res) => {
    await changePassword(req, res)
})

studentRouter.delete('/', async (req, res) => {
    await deleteStudent(req, res)
})

studentRouter.delete('/:id', async (req, res) => {
    await adminDeleteStudent(req, res)
})


export default studentRouter
