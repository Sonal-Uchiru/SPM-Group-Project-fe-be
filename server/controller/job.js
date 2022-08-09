import express from 'express'
import {
    saveJob,
    getJob,
    updateJob,
    deleteJob,
    getAllJob,
    getAllJobByCompany,
} from '../service/job.js'

const jobRouter = express.Router()

jobRouter.post('/', saveJob)
jobRouter.get('/', getAllJob)
jobRouter.get('/:id', getJob)
jobRouter.put('/:id', updateJob)
jobRouter.put('/:id', updateJob)
jobRouter.delete('/:id', deleteJob)
jobRouter.get('/getbycompany/:id', getAllJobByCompany)

export { jobRouter }
