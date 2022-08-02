import express from 'express'

const studentSubmissionRouter = express.Router()

import {
    createStudentSubmission,
    getAllStudentSubmissions,
    getAllSubmissionByGroupID,
    getAllSubmissionBySubmissionTypeID,
    deleteStudentSubmissionByID,
    updateStudentSubmissionByID
} from '../service/studentSubmission.js'

studentSubmissionRouter.post("/", createStudentSubmission);
studentSubmissionRouter.get("/", getAllStudentSubmissions);
studentSubmissionRouter.get("/group/:id", getAllSubmissionByGroupID);
studentSubmissionRouter.get("/submissiontype/:id", getAllSubmissionBySubmissionTypeID);
studentSubmissionRouter.delete("/:id", deleteStudentSubmissionByID);
studentSubmissionRouter.put("/:id", updateStudentSubmissionByID);


export default studentSubmissionRouter;