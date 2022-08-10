import {decode} from "../middleware/tokenDecode.js";
import {JobApplication} from "../models/jobApplication.js";
import {validatePost} from "../validations/jobApplication.js";

export const saveJobApplication = async (req, res) => {
    try {
        const {error} = validatePost(req.body)

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