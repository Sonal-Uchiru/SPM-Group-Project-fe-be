import {decode} from "../middleware/tokenDecode.js";
import {JobApplication} from "../models/jobApplication.js";
import {validate, validationStatusChange} from "../validations/jobApplication.js";
import {updateById} from "../shared/updateById.js";
import {deleteById} from "../shared/deleteById.js";
import {getById} from "../shared/getById.js";
import {getAllContentByToken} from "../shared/getAllContentByToken.js";
import {getModel} from "../shared/modelSelector.js";

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
    try {
        const applicant = await decode(req);

        const content = await JobApplication.aggregate([
            {
                $match: {applicant: applicant._id}
            },
            {"$addFields": {"jobId": {"$toObjectId": "$jobId"}}},
            {
                $lookup: {
                    from: "jobs",
                    localField: "jobId",
                    foreignField: "_id",
                    as: "jobDetails"
                }
            },
            {"$addFields": {"companyId": {"$toObjectId": "$companyId"}}},
            {
                $lookup: {
                    from: "companies",
                    localField: "companyId",
                    foreignField: "_id",
                    as: "companyDetails"
                }
            },
        ])

        if (content) {
            return res.status(200).json(content)
        }
        return res.status(404).send({message: `JOB APPLICATION model ${applicant} not found`});
    } catch (e) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export const deleteJobApplicationsByJobID = async (jobId) => {
    await JobApplication.deleteMany({jobId})
}

export const deleteJobApplicationsByApplicantID = async (applicant) => {
    await JobApplication.deleteMany({applicant})
}

export const updateJobApplicationStatus = async (req, res) => {
    try {
        const {error} = validationStatusChange(req.body)

        if (error)
            return res.status(400).send({message: error.details[0].message})

        const userId = await decode(req);

        if (!req.params.id) {
            return res.status(404).send({message: "id not found"});
        }

        const content = await JobApplication.findByIdAndUpdate(req.params.id, {
            $set: {
                status: req.body.status,
                updatedDate: new Date(),
                modifiedUser: userId._id,
            },
        })

        if (content) {
            return res.status(200).send({message: `${req.params.id} content updated successfully`})
        }

    } catch (e) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export const getJobApplicationsByJobId = async (req, res) => {
    try {

        if (!req.params.id) {
            return res.status(404).send({message: 'id not found'})
        }

        const jobId = req.params.id

        const content = await JobApplication.aggregate([
            {
                $match: {jobId}
            },
            {"$addFields": {"applicant": {"$toObjectId": "$applicant"}}},
            {
                $lookup: {
                    from: "users",
                    localField: "applicant",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
        ])

        if (content) {
            return res.status(200).send({
                content,
            })
        }

        res.status(404).send({
            message: `Job applications model ${req.params.id} not found`,
        })
    } catch (e) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export const getAllJobApplications = async (req, res) => {
    try {
        const content = await JobApplication.find()
        res.status(200).send({content})

    } catch (e) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export const getNoJobApplications = async (req, res) => {
    try {

        if (!req.params.id) {
            return res.status(404).send({message: 'id not found'})
        }

        const content = await JobApplication.find({companyId: req.params.id})
        res.status(200).send({noOfJobApplications: content.length})

    } catch (e) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}