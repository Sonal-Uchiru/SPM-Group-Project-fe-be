import express from 'express'
import {
    deleteJobApplicationById,
    getJobApplicationById, getJobApplicationsByToken,
    saveJobApplication,
    updateJobApplicationById, updateJobApplicationStatus
} from "../service/jobApplication.js";

const jobApplicationRouter = express.Router()

jobApplicationRouter.post('/', saveJobApplication)
jobApplicationRouter.put('/:id', updateJobApplicationById)
jobApplicationRouter.delete('/:id', deleteJobApplicationById)
jobApplicationRouter.get('/;id', getJobApplicationById)
jobApplicationRouter.get('/', getJobApplicationsByToken)
jobApplicationRouter.patch('/:id', updateJobApplicationStatus)

export {jobApplicationRouter}