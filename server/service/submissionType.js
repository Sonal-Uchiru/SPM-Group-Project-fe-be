import {SubmissionType, validate} from '../models/submissionType.js'
import {decode} from '../middleware/tokenDecode.js'
import {currentDateAndTIme} from '../validations/dateAndTime.js'
import {StudentSubmission} from '../models/studentSubmission.js'
import {ObjectId} from 'mongodb'

export async function createSubmission(req, res) {
    try {
        const {error} = validate(req.body)

        if (error)
            return res.status(400).send({message: error.details[0].message})

        const submissionObj = await new SubmissionType({
            ...req.body,
        }).save()

        res.status(201).send({
            submissionObj,
            message: 'Submission type created successfully',
        })
    } catch (err) {
        res.status(500).json({message: error.message})
    }
}

export async function getAllSubmissions(req, res) {
    try {
        const faculty = req.query.faculty

        const submissionList = faculty
            ? await SubmissionType.find({status: 0, faculty})
            : await SubmissionType.find({status: 0})

        let message = ''
        let status = ''
        if (!submissionList.length) {
            status = 404
            message = 'There are no active submission types'
        } else {
            status = 200
            message = 'Data fetched successfully'
        }

        res.status(status).send({
            submissionList,
            message: message,
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export async function getSubmissionTypeByID(req, res) {
    try {
        const submissionID = req.params.id
        const submissionObj = await SubmissionType.findById(submissionID, {
            status: 0,
        })

        let message = ''
        let status = ''
        if (submissionObj === null) {
            status = 404
            message = `There are no active submission types by ID '${submissionID}' `
        } else {
            status = 201
            message = `Submission type '${submissionID}' retrieved successfully`
        }

        res.status(status).send({
            submissionObj,
            message: message,
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export async function updateSubmissionTypeByID(req, res) {
    try {
        const submissionID = req.params.id
        const modified_user = await decode(req)
        const modified_date = currentDateAndTIme()
        let message = ''
        let status = ''

        const submissionType = await SubmissionType.findByIdAndUpdate(
            submissionID,
            {
                ...req.body,
                modified_user,
                modified_date,
            }
        )

        if (submissionType === null) {
            status = 404
            message = `There are no  submission types by ID '${submissionID}' `
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

export async function deleteSubmissionTypeByID(req, res) {
    try {
        let message = ''
        let status = ''
        const submissionID = req.params.id
        const submissionType = await SubmissionType.findByIdAndDelete(
            submissionID
        )

        if (submissionType === null) {
            status = 404
            message = `There are no  submission types by ID '${submissionID}' `
        } else {
            status = 200
            message = `Submission type '${submissionID}' Deleted successfully`
        }

        res.status(status).send({
            message: message,
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export async function getSubmissionDetailsBySubmissionID(req, res) {
    try {
        const submissionID = req.params.id

        const result = await SubmissionType.aggregate([
            {
                $match: {_id: ObjectId(submissionID)},
            },
            {$addFields: {typeID: {$toString: '$_id'}}},
            {
                $lookup: {
                    from: 'studentsubmissions',
                    localField: 'typeID',
                    foreignField: 'submission_type_id',
                    as: 'studentSubmissions',
                },
            },
        ])

        //Do this after today push
        // var fullData = await getStudentGroups(result)

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
