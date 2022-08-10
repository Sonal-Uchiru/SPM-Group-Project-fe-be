import express from 'express'
import {saveJobApplication} from "../service/jobApplication.js";

const jobApplicationRouter = express.Router()

jobApplicationRouter.post('/', saveJobApplication)

export {jobApplicationRouter}