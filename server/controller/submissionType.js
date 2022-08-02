import express from 'express'

const submissionTypeRouter = express.Router()

import {
    createSubmission,
    getAllSubmissions,
    getSubmissionTypeByID,
    updateSubmissionTypeByID,
    deleteSubmissionTypeByID,
    getSubmissionDetailsBySubmissionID
} from '../service/submissionType.js'

submissionTypeRouter.post("/", createSubmission);
submissionTypeRouter.get("/", getAllSubmissions);
submissionTypeRouter.get("/:id", getSubmissionTypeByID);
submissionTypeRouter.get("/details/:id", getSubmissionDetailsBySubmissionID);
submissionTypeRouter.put("/:id", updateSubmissionTypeByID);
submissionTypeRouter.delete("/:id", deleteSubmissionTypeByID);


export default submissionTypeRouter;