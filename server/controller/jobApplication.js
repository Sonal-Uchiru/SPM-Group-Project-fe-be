import express from 'express'
import {
    deleteJobApplicationById,
    getJobApplicationById,
    saveJobApplication,
    updateJobApplicationById
} from "../service/jobApplication.js";

const jobApplicationRouter = express.Router()

jobApplicationRouter.post('/', saveJobApplication)
jobApplicationRouter.put('/:id', updateJobApplicationById)
jobApplicationRouter.delete('/:id', deleteJobApplicationById)
jobApplicationRouter.get('/;id', getJobApplicationById)

export {jobApplicationRouter}