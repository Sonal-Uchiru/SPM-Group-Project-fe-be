import {StudentSubmission, validate} from '../models/studentSubmission.js'
import {decode} from '../middleware/tokenDecode.js'
import {currentDateAndTIme} from '../validations/dateAndTime.js'
import {ObjectId} from 'mongodb'

export async function createStudentSubmission(req, res) {
    try {
        const {error} = validate(req.body)

        if (error)
            return res.status(400).send({message: error.details[0].message})

        const submissionObj = await new StudentSubmission({
            ...req.body,
        }).save()

        res.status(201).send({
            submissionObj,
            message: 'Submission added successfully',
        })
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export async function getAllStudentSubmissions(req, res) {
    try {
        const submission_type_id = req.query.submission_type_id
        const student_group_id = req.query.student_group_id

        const submissionList =
            submission_type_id && student_group_id
                ? await StudentSubmission.find({
                    status: 0,
                    submission_type_id,
                    student_group_id,
                })
                : await StudentSubmission.find({status: 0})

        let message = ''
        let status = ''
        if (submissionList.length) {
            status = 200
            message = 'Data fetched successfully'
        } else {
            status = 404
            message = 'There are no active submissions'
        }
        res.status(status).send({
            submissionList,
            message: message,
        })
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export async function getAllSubmissionByGroupID(req, res) {
    try {
        const groupID = req.params.id
        const submissionList = await StudentSubmission.find({
            student_group_id: groupID,
            status: 0,
        })

        let message = ''
        let status = ''
        if (submissionList.length) {
            status = 200
            message = 'Data fetched successfully'
        } else {
            status = 404
            message = `There are no active submissions by Group ID = '${groupID}'`
        }
        res.status(status).send({
            submissionList,
            message: message,
        })
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export async function getAllSubmissionBySubmissionTypeID(req, res) {
    try {
        const submissionTypeID = req.params.id
        // const submissionList = await StudentSubmission.find({submission_type_id: submissionTypeID, status: 0 })
        const submissionList = await StudentSubmission.aggregate([
            {
                $match: {
                    $and: [
                        {submission_type_id: submissionTypeID},
                        {status: 0},
                    ],
                },
            },
            {
                $addFields: {
                    studentGroupID: {$toObjectId: '$student_group_id'},
                },
            },
            {
                $lookup: {
                    from: 'studentgroups',
                    localField: 'studentGroupID',
                    foreignField: '_id',
                    as: 'submissionGroup',
                },
            },
        ])

        let message = ''
        let status = ''
        if (submissionList.length) {
            status = 200
            message = 'Data fetched successfully'
        } else {
            status = 404
            message = `There are no active submissions by Submission ID = '${submissionTypeID}'`
        }
        res.status(status).send({
            submissionList,
            message: message,
        })
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export async function updateStudentSubmissionByID(req, res) {
    try {
        const submissionID = req.params.id
        const modified_user = await decode(req)
        const modified_date = currentDateAndTIme()
        let message = ''
        let status = ''

        const submissionType = await StudentSubmission.findByIdAndUpdate(
            submissionID,
            {
                $set: {
                    ...req.body,
                    modified_user,
                    modified_date,
                }
            }
        )

        if (submissionType === null) {
            status = 404
            message = `There are no  Student submissions by ID '${submissionID}' `
        } else {
            status = 200
            message = `Submission type '${submissionID}' updated successfully`
        }

        res.status(status).send({
            message: message,
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export async function deleteStudentSubmissionByID(req, res) {
    try {
        let message = ''
        let status = ''
        const submissionID = req.params.id
        const submissionType = await StudentSubmission.findByIdAndDelete(
            submissionID
        )

        if (submissionType === null) {
            status = 404
            message = `There are no  student submission  by ID '${submissionID}' `
        } else {
            status = 200
            message = `Student submission '${submissionID}' Deleted successfully`
        }

        res.status(status).send({
            message: message,
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
