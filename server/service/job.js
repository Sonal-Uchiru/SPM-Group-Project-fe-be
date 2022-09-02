import { Job } from '../models/job.js'
import { validatePost, validatePut } from '../validations/job.js'
import { getById } from '../shared/getById.js'
import { updateById } from '../shared/updateById.js'
import { decode } from '../middleware/tokenDecode.js'
import { getAllContentByToken } from '../shared/getAllContentByToken.js'
import { deleteJobApplicationsByJobID } from './jobApplication.js'
import { deleteById } from '../shared/deleteById.js'
import { Company } from '../models/company.js'
import { ObjectId } from 'mongodb'
//URL: http://localhost:8080/api/protected/job/
export const saveJob = async (req, res) => {
    try {
        const { error } = validatePost(req.body)

        if (error)
            return res.status(400).send({ message: error.details[0].message })

        const companyId = await decode(req)

        await new Job({ ...req.body, companyId }).save()
        res.status(201).send({ message: 'Job created successfully' })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

//URL: http://localhost:8080/api/protected/job/
export const getAllJobsByToken = async (req, res) => {
    try {
        const companyId = await decode(req)

        const content = await Job.find({ companyId: companyId._id })
        const company = await Company.findById(ObjectId(companyId._id))

        if (content && company) {
            return res.status(200).send(content)
        }
        if (content === false || company === false) {
            res.status(404).send({
                message: `There are no jobs related to company ${companyId._id} `,
            })
        }
    } catch (e) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const content = await Job.aggregate([
            { $addFields: { companyId: { $toObjectId: '$companyId' } } },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'companyDetails',
                },
            },
        ])

        res.status(200).send({ content })
    } catch (e) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

//URL: http://localhost:8080/api/protected/job/62f29917458b29eab498a1f1
export const getJob = async (req, res) => {
    await getById(req, res, 'job')
}

// URL: http://localhost:8080/api/protected/job/62f29917458b29eab498a1f1
export const updateJob = async (req, res) => {
    await updateById(req, res, 'job', validatePut)
}

export const deleteJobsByCompanyId = async (companyId) => {
    const companyPostedJobs = await Job.find({ companyId })
    if (companyPostedJobs) {
        companyPostedJobs.map(async (job) => {
            await deleteJobApplicationsByJobID(job._id)
        })
        await Job.deleteMany({ companyId })
    }
}

//URL: http://localhost:8080/api/protected/job/62f293e5419ba56b21304307
export const deleteJob = async (req, res) => {
    deleteById(req, res, 'job').then(async (res) => {
        await deleteJobApplicationsByJobID(req.params.id)
    })
}

// URL: http://localhost:8080/api/protected/job/getbycompany/Com_01
export const getAllJobByCompany = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).send({ message: 'id not found' })
        }
        const companyId = req.params.id

        const content = await Job.find({ companyId })

        const company = await Company.findById(companyId)

        company.password = undefined

        if (content && company) {
            return res.status(200).send({
                content,
                company,
            })
        }

        res.status(404).send({
            message: `Job model ${req.params.id} not found`,
        })
    } catch (e) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

// URL: http://localhost:8080/api/protected/job/62f29917458b29eab498a1f1
export const changeJobStatus = async (req, res) => {
    try {
        const userId = await decode(req)
        if (!req.params.id) {
            return res.status(404).send({ message: 'id not found' })
        }

        const content = await Job.findById(req.params.id)
        if (!content) {
            return res.status(404).send({
                message: `Job model ${req.params.id} not found`,
            })
        }

        if (content.status === 0) {
            await Job.findByIdAndUpdate(req.params.id, {
                $set: {
                    status: 1,
                    updatedDate: new Date(),
                    modifiedUser: userId._id,
                },
            })
            return res.status(200).send({
                message: `${req.params.id} status changed successfully`,
            })
        }

        await Job.findByIdAndUpdate(req.params.id, {
            $set: {
                status: 0,
                updatedDate: new Date(),
                modifiedUser: userId._id,
            },
        })

        return res.status(200).send({
            message: `${req.params.id} status changed successfully`,
        })
    } catch (e) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

export const getNoJobs = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).send({ message: 'id not found' })
        }

        const content = await Job.find({ companyId: req.params.id })

        res.status(200).send({ noOfJobPosted: content.length })
    } catch (e) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}
