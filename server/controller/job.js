import express from 'express'
import {
    saveJob,
    getJob,
    updateJob,
    deleteJob,
    getAllJobByCompany,
    changeJobStatus,
    getAllJobsByToken,
    getAllJobs,
    getNoJobs,
} from '../service/job.js'

const jobRouter = express.Router()

jobRouter.post('/', saveJob)
jobRouter.get('/', getAllJobsByToken)
jobRouter.get('/list', getAllJobs)
jobRouter.get('/:id', getJob)
jobRouter.get('/getbycompany/:id', getAllJobByCompany)
jobRouter.put('/:id', updateJob)
jobRouter.delete('/:id', deleteJob)
jobRouter.patch('/:id', changeJobStatus)
jobRouter.get('/companies/summary/:id', getNoJobs)

export { jobRouter }
