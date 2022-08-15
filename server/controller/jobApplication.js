import express from 'express'
import {
    deleteJobApplicationById,
    getJobApplicationById, getJobApplicationsByJobId, getJobApplicationsByToken, getNoJobApplications,
    saveJobApplication,
    updateJobApplicationById, updateJobApplicationStatus
} from "../service/jobApplication.js";

const jobApplicationRouter = express.Router()

jobApplicationRouter.post('/', saveJobApplication)
jobApplicationRouter.put('/:id', updateJobApplicationById)
jobApplicationRouter.delete('/:id', deleteJobApplicationById)
jobApplicationRouter.get('/:id', getJobApplicationById)
jobApplicationRouter.get('/jobs/:id', getJobApplicationsByJobId)
jobApplicationRouter.get('/', getJobApplicationsByToken)
jobApplicationRouter.patch('/:id', updateJobApplicationStatus)
jobApplicationRouter.get('/companies/summary/:id', getNoJobApplications)

export {jobApplicationRouter}
