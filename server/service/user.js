import {User} from '../models/user.js'
import {validatePost, validationUpdate} from "../validations/user.js";
import bcrypt from "bcrypt";
import {getByToken} from "../shared/getByToken.js";
import {updateById} from "../shared/updateById.js";
import {updateByToken} from "../shared/updateByToken.js";
import {deleteByToken} from "../shared/deleteByToken.js";
import {Company} from "../models/company.js";
import {deleteJobApplicationsByApplicantID} from "./jobApplication.js";
import {decode} from "../middleware/tokenDecode.js";


export const saveUser = async (req, res) => {
    try {
        const {error} = validatePost(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const company = await Company.findOne({email: req.body.email})
        const user = await User.findOne({email: req.body.email})
        if (user || company)
            return res
                .status(409)
                .send({message: 'User with given email already Exist!'})
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const content = await new User({...req.body, password: hashPassword}).save()

        if (content) res.status(201).send(content)
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export const getUser = async (req, res) => {
    await getByToken(req, res, "user")
}

export const updateUser = async (req, res) => {
    await updateByToken(req, res, "user", validationUpdate)
}

export const deleteUser = async (req, res) => {
    await deleteByToken(req, res, "user", deleteJobApplicationsByApplicantID)
}

export const getAllUsers = async (req, res) => {
    try {
        const content = await User.find()
        res.status(200).send(content)
    } catch (e) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

