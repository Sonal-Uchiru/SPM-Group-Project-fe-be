import bcrypt from 'bcrypt'
import {Student, validate} from '../models/student.js'
import {CheckEmailExists} from '../validations/userAlreadyExist.js'
import {decode} from '../middleware/tokenDecode.js'
import {currentDateAndTIme} from '../validations/dateAndTime.js'

//Create Student

export async function createStudent(req, res) {
    try {
        const {error} = validate(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const isExist = await CheckEmailExists(req.body.email)
        if (isExist)
            return res
                .status(409)
                .send({message: 'User with given email already Exist!'})

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const student = await new Student({
            ...req.body,
            password: hashPassword,
        }).save()

        res.status(201).send({
            student,
            message: 'Student created successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

//Get All Students
export function getAllStudents(req, res) {
    Student.find()
        .then((student) => {
            return res.status(200).send({
                student,
                message: 'Students retrieved successfully',
            })
        })
        .catch((error) => {
            return res.status(500).send({message: 'Internal Server Error'})
        })
}

//Get One Student
export async function getOneStudent(req, res) {
    const userID = await decode(req)
    const student = await Student.findById(userID)
        .then((student) => {
            return res.status(200).send({
                student,
                message: 'Student retrieved successfully',
            })
        })
        .catch((error) => {
            return res.status(500).send({message: 'Internal Server Error'})
        })
}

//Get Students By Group ID
export async function getStudentsByGroup(req, res) {
    let group_id = req.params.id
    const students = await Student.find({group_id})
        .then((students) => {
            if (students) {
                return res.status(200).send({
                    students,
                    message: `Students retrieved successfully with Group ID ${group_id}`,
                })
            }
            return res.status(404).send({
                students,
                message: `Students Not Found with this Group ID ${group_id}`,
            })
        })
        .catch((error) => {
            return res.status(500).send({message: 'Internal Server Error'})
        })
}

//Update Student
export async function updateStudent(req, res) {
    const userID = await decode(req)
    const update = Student.findByIdAndUpdate(userID, {...req.body})
        .then(() => {
            return res.status(200).send({
                message: `Student profile updated successfully`,
            })
        })
        .catch((error) => {
            return res.status(500).send({message: 'Internal Server Error'})
        })
}

//Update Student By Admin
export async function adminUpdateStudent(req, res) {
    let userID = req.params.id
    const update = Student.findByIdAndUpdate(userID, {...req.body})
        .then(() => {
            return res.status(200).send({
                message: `Student profile updated successfully`,
            })
        })
        .catch((error) => {
            return res.status(500).send({message: 'Internal Server Error'})
        })
}

// Delete Student By Admin
export async function adminDeleteStudent(req, res) {
    let userID = req.params.id
    await Student.findByIdAndDelete(userID)
        .then(() => {
            return res.status(200).send({
                message: 'Student deleted successfully',
            })
        })
        .catch((error) => {
            return res.status(500).send({message: 'Internal Server Error'})
        })
}

// Delete Student
export async function deleteStudent(req, res) {
    try {
        const userID = await decode(req)
        const isValid = await checkPassword(req, userID)
        if (isValid) {
            await Student.findByIdAndDelete(userID)
            return res.status(200).send({
                message: 'Student deleted successfully',
            })
        }
        res.status(401).send({message: 'Invalid Credentials'})
    } catch (err) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

//Change Password
export async function changePassword(req, res) {
    const userID = await decode(req)
    const isValid = await checkPassword(req, userID)

    if (isValid) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.new_password, salt)
        await Student.findByIdAndUpdate(userID, {
            $set: {
                password: hashPassword,
                modified_date: currentDateAndTIme(),
                modified_user: userID,
            },
        })
            .then(() => {
                return res.status(200).send({
                    message: 'Student changed password successfully',
                })
            })
            .catch((error) => {
                return res
                    .status(500)
                    .send({message: 'Internal Server Error'})
            })
    }
    return res.status(401).send({message: 'Invalid Credentials'})
}

// Check Password
async function checkPassword(req, userID) {
    const user = await Student.findById(userID)
    if (user) {
        return await bcrypt.compare(req.body.password, user.password)
    }
}

export async function allocateStudetsToStudentGroup(
    studentArray,
    studentGroupID
) {
    let i = 0
    for (i; i < studentArray.length; i++) {
        await Student.findByIdAndUpdate(studentArray[i], {
            group_id: studentGroupID,
        })
    }
    return 'success'
}
