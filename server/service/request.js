import {Request, validate} from '../models/request.js'
import {Student} from '../models/student.js'
import {ObjectId} from 'mongodb'

export async function createRequest(req, res) {
    try {
        const {error} = validate(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const request = await new Request({
            ...req.body,
        }).save()

        res.status(201).send({
            request,
            message: 'Request Created Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function getAllRequests(res) {
    try {
        // const requests = await Request.find()

        const requests = await Request.aggregate([
            {
                $addFields: {
                    topicID: {$toObjectId: '$topic_id'},
                },
            },
            {
                $lookup: {
                    from: 'topics',
                    localField: 'topicID',
                    foreignField: '_id',
                    as: 'topicDetails',
                },
            },
            {
                $addFields: {
                    topicId: {$toString: '$topic_id'},
                },
            },
            {
                $lookup: {
                    from: 'studentgroups',
                    localField: 'topicId',
                    foreignField: 'topic_id',
                    as: 'studentGroupDetails',
                },
            },
        ])

        res.status(200).send({
            requests,
            message: 'Requests Retrieved Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function getRequestByID(req, res) {
    try {
        const requestID = req.params.id

        const request = await Request.aggregate([
            {
                $match: {_id: ObjectId(requestID)},
            },
            {$addFields: {topicID: {$toString: '$topic_id'}}},
            {
                $lookup: {
                    from: 'studentgroups',
                    localField: 'topicID',
                    foreignField: 'topic_id',
                    as: 'groupDetails',
                },
            },
            {
                $addFields: {
                    groupID: '$groupDetails[0]',
                },
            },
            {
                $lookup: {
                    from: 'students',
                    localField: 'groupID',
                    foreignField: 'group_id',
                    as: 'groupMemberDetails',
                },
            },
        ])

        if (request) {
            return res.status(200).send({
                request,
                message: 'Requst Retrieved Successfully',
            })
        }

        return res.status(404).send({
            message: 'No Request Found for that Request ID',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function getAllRequstsByStaffID(req, res) {
    try {
        const staffID = req.params.id

        const requests = await Request.find({staff_id: staffID})

        return res.status(200).send({
            requests,
            message: 'Requests Retrieved Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function deleteRequest(req, res) {
    try {
        const requstID = req.params.id

        await Request.findByIdAndDelete(requstID)

        return res.status(200).send({
            message: 'Request Deleted Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}
