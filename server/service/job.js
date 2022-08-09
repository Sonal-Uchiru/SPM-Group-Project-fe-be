import { Job } from '../models/job.js'
import { validatePost, updatePost } from '../validations/job.js'
import { v4 as uuidv4 } from 'uuid'
import { getById } from '../shared/getById.js'
import { updateById } from '../shared/updateById.js'
import { getByToken } from '../shared/getByToken.js'

//URL: http://localhost:8080/api/protected/job/
export const saveJob = async (req, res) => {
    try {
        req.body.jobId = uuidv4()
        const { error } = validatePost(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })

        await new Job({ ...req.body }).save()
        res.status(201).send({ message: 'Job created successfully' })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

//URL: http://localhost:8080/api/protected/job/
export const getAllJob = async (req, res) => {
    await getByToken(req, res, 'job')
}

//URL: http://localhost:8080/api/protected/job/62f29917458b29eab498a1f1
export const getJob = async (req, res) => {
    await getById(req, res, 'job')
}

// URL: http://localhost:8080/api/protected/job/62f29917458b29eab498a1f1
export const updateJob = async (req, res) => {
    await updateById(req, res, 'job', updatePost)
}

//URL: http://localhost:8080/api/protected/job/62f293e5419ba56b21304307
export const deleteJob = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).send({ message: 'id not found' })
        }

        const content = await Job.findByIdAndDelete(req.params.id)
        if (content) {
            return res.status(200).send({
                message: `${req.params.id} content deleted successfully`,
            })
        }

        res.status(404).send({
            message: `Job model ${req.params.id} not found`,
        })
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

// URL: http://localhost:8080/api/protected/job/getbycompany/Com_01
export const getAllJobByCompany = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).send({ message: 'id not found' })
        }
        const companyId = req.params.id

        const content = await Job.find({ companyId: companyId })
        if (content) {
            return res.status(200).send({
                ...content,
            })
        }

        res.status(404).send({
            message: `Job model ${req.params.id} not found`,
        })
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}
