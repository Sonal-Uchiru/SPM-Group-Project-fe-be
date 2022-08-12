import {Company} from '../models/company.js'
import {validatePost} from "../validations/company.js";
import bcrypt from "bcrypt";
import {getByToken} from "../shared/getByToken.js";
import {updateById} from "../shared/updateById.js";
import {updateByToken} from "../shared/updateByToken.js";
import {deleteByToken} from "../shared/deleteByToken.js";


export const saveCompany = async (req, res) => {
    try {
        const {error} = validatePost(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        //  Validation ?????   
        // const user = await Company.findOne({email: req.body.email})
        // if (user)
        //     return res
        //         .status(409)
        //         .send({message: 'Company with given email already Exist!'})

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const content = await new Company({...req.body, password: hashPassword}).save()

        if (content) res.status(201).send(content)
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}


export const getAllCompanies = async (req, res) => {
    try {
        const content = await Company.find()
        res.status(200).send(content)
    } catch (e) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}