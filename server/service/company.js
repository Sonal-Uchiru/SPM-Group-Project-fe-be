import {Company} from '../models/company.js'
import {User} from '../models/user.js';
import {validatePost, validateUpdate} from "../validations/company.js";
import bcrypt from "bcrypt";
import {getByToken} from "../shared/getByToken.js";
import {updateByToken} from "../shared/updateByToken.js";
import {deleteJobsByCompanyId} from "./job.js";
import {deleteByToken} from "../shared/deleteByToken.js";
import {decode} from "../middleware/tokenDecode.js";
import express from "express";
import {changePassword} from "../shared/changePassword.js";
import {getById} from "../shared/getById.js";


export const saveCompany = async (req, res) => {
    try {
        const {error} = validatePost(req.body)

        if (error)
            return res.status(400).send({message: error.details[0].message})

        const company = await Company.findOne({email: req.body.email})
        const user = await User.findOne({email: req.body.email})
        if (user || company)
            return res
                .status(409)
                .send({message: 'Content with given email already Exist!'})

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

export const updateCompany = async (req, res) => {
    await updateByToken(req, res, "company", validateUpdate)
}

export const getCompany = async (req, res) => {
    await getByToken(req, res, "company")
}

export const deleteCompany = async (req, res) => {
    await deleteByToken(req, res, "company", deleteJobsByCompanyId)
}

export const updatePassword = async (req, res) => {
    await changePassword(req, res, "company")
}

export const getCompanyById = async (req, res) => {
    await getById(req, res, 'company')
}
