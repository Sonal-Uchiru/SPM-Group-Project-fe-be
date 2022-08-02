import {StudentGroup, validate} from '../models/student_group.js'
import {allocateStudetsToStudentGroup} from './student.js'
import {ObjectId} from 'mongodb'

export async function createGroup(req, res) {
    try {
        const studentsArray = req.body.students_array
        const {error} = validate(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const studentGroup = await new StudentGroup({
            ...req.body,
        }).save()

        await allocateStudetsToStudentGroup(studentsArray, studentGroup._id)

        res.status(201).send({
            studentGroup,
            message: 'Student Group Registered Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function getAllStudentGroups(res) {
    try {
        const studentGroups = await StudentGroup.aggregate([
            {
                $addFields: {
                    groupLeaderID: {$toObjectId: '$group_leader_id'},
                },
            },
            {
                $lookup: {
                    from: 'students',
                    localField: 'groupLeaderID',
                    foreignField: '_id',
                    as: 'groupLeaderDetails',
                },
            },
        ])

        res.status(200).send({
            studentGroups,
            message: 'Student Groups Retrieved Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function getStudentGroupByID(req, res) {
    try {
        const studentGroupID = req.params.id

        const studentGroup = await StudentGroup.aggregate([
            {
                $match: {_id: ObjectId(studentGroupID)},
            },
            {
                $addFields: {
                    groupLeaderID: {$toObjectId: '$group_leader_id'},
                },
            },
            {
                $lookup: {
                    from: 'students',
                    localField: 'groupLeaderID',
                    foreignField: '_id',
                    as: 'groupLeaderDetails',
                },
            },
            {$addFields: {groupID: {$toString: '$_id'}}},
            {
                $lookup: {
                    from: 'students',
                    localField: 'groupID',
                    foreignField: 'group_id',
                    as: 'groupMembers',
                },
            },
            {
                $lookup: {
                    from: 'studentsubmissions',
                    localField: 'groupID',
                    foreignField: 'student_group_id',
                    as: 'submissionDetails',
                },
            },
            {
                $addFields: {
                    supervisorID: {$toObjectId: '$supervisor_id'},
                },
            },
            {
                $lookup: {
                    from: 'staffs',
                    localField: 'supervisorID',
                    foreignField: '_id',
                    as: 'supervisorDetails',
                },
            },
            {
                $addFields: {
                    coSupervisorID: {$toObjectId: '$co_supervisor_id'},
                },
            },
            {
                $lookup: {
                    from: 'staffs',
                    localField: 'coSupervisorID',
                    foreignField: '_id',
                    as: 'coSupervisorDetails',
                },
            },
        ])

        if (studentGroup) {
            return res.status(200).send({
                studentGroup,
                message: 'Student Group Retrieved Successfully',
            })
        }

        return res.status(404).send({
            message: 'No Student Group Found for that Student Group ID',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function getStudentGroupRequestsByID(req, res) {
    try {
        const studentGroupID = req.params.id

        const studentGroup = await StudentGroup.aggregate([
            {
                $match: {_id: ObjectId(studentGroupID)},
            },
            {$addFields: {topicID: {$toString: '$topic_id'}}},
            {
                $lookup: {
                    from: 'requests',
                    localField: 'topicID',
                    foreignField: 'topic_id',
                    as: 'requestDetails',
                },
            },
            {$addFields: {topicId: {$toObjectId: '$topic_id'}}},
            {
                $lookup: {
                    from: 'topics',
                    localField: 'topicId',
                    foreignField: '_id',
                    as: 'topicDetails',
                },
            },
            {
                $addFields: {
                    groupLeaderID: {$toObjectId: '$group_leader_id'},
                },
            },
            {
                $lookup: {
                    from: 'students',
                    localField: 'groupLeaderID',
                    foreignField: '_id',
                    as: 'groupLeaderDetails',
                },
            },

            {
                $addFields: {
                    groupID: {$toString: '$group_id'},
                },
            },
            {
                $lookup: {
                    from: 'students',
                    localField: 'groupID',
                    foreignField: 'group_id',
                    as: 'memberDetails',
                },
            },
        ])

        if (studentGroup) {
            return res.status(200).send({
                studentGroup,
                message: 'Student Group Requsts Retrieved Successfully',
            })
        }

        return res.status(404).send({
            message: 'No Student Group Found for that Student Group ID',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function getAllStudentGroupsByStaffID(req, res) {
    try {
        const staffID = req.params.id

        if (req.query.isSupervisor == 'true') {
            const studentGroups = await StudentGroup.find({
                supervisor_id: staffID,
            })

            return res.status(200).send({
                studentGroups,
                message: 'Student Groups  Retrieved Successfully',
            })
        }

        if (req.query.isSupervisor === 'false') {
            const studentGroups = await StudentGroup.find({
                co_supervisor_id: staffID,
            })

            return res.status(200).send({
                studentGroups,
                message: 'Student Groups  Retrieved Successfully',
            })
        }
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

//Get Student Groups where panel ID is empty
export async function getAllGroupsWithoutPanels(res) {
    try {
        const studentGroups = await StudentGroup.find({
            evaluation_panel_id: null,
        })

        res.status(200).send({
            studentGroups,
            message: 'Student Groups Retrieved Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function updateStudentGroup(req, res) {
    try {
        const groupID = req.params.id
        const staffID = req.body.staff

        if (req.query.isSupervisor == 'true') {
            await StudentGroup.findByIdAndUpdate(groupID, {
                $set: {supervisor_id: staffID},
            })

            return res.status(200).send({
                message: 'Student Groups  Updated Successfully',
            })
        }

        if (req.query.isSupervisor === 'false') {
            await StudentGroup.findByIdAndUpdate(groupID, {
                $set: {co_supervisor_id: staffID},
            })
            return res.status(200).send({
                message: 'Student Groups Updated Successfully',
            })
        }
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function allocateGroupsToPanels(groupArray, panelID, panelType) {
    try {
        let i = 0
        for (i; i < groupArray.length; i++) {
            if (panelType === 'Evaluation') {
                await StudentGroup.findByIdAndUpdate(groupArray[i], {
                    evaluation_panel_id: panelID,
                })
            } else {
                await StudentGroup.findByIdAndUpdate(groupArray[i], {
                    presentation_panel_id: panelID,
                })
            }
        }
        return 'success'
    } catch (error) {
        // res.status(500).send({ message: 'Internal Server Error' })
    }
}
