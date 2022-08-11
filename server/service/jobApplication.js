import {decode} from "../middleware/tokenDecode.js";
import {JobApplication} from "../models/jobApplication.js";
import {validate} from "../validations/jobApplication.js";
import {updateById} from "../shared/updateById.js";
import {deleteById} from "../shared/deleteById.js";
import {getById} from "../shared/getById.js";
import {getAllContentByToken} from "../shared/getAllContentByToken.js";

export const saveJobApplication = async (req, res) => {
    try {
        const {error} = validate(req.body)

        if (error) return res.status(400).send({message: error.details[0].message})
        const userId = await decode(req)

        const jobApplication = await JobApplication.findOne({applicant: userId._id, jobId: req.body.jobId})

        if (jobApplication) return res.status(409).send({message: 'Job Application already exists'})

        const content = await new JobApplication({...req.body, applicant: userId}).save()

        if (content) res.status(201).send(content)
    } catch (e) {
        console.log(e)
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export const updateJobApplicationById = async (req, res) => {
    await updateById(req, res, 'jobApplication', validate)
}

export const deleteJobApplicationById = async (req, res) => {
    await deleteById(req, res, 'jobApplication')
}

export const getJobApplicationById = async (req, res) => {
    await getById(req, res, 'jobApplication')
}

export const getJobApplicationsByToken = async (req, res) => {
    await getAllContentByToken(req, res, 'jobApplication', 'applicant')
}