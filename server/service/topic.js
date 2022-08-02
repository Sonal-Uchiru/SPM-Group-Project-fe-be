import {Topic, validate} from '../models/topic.js'
import {decode} from '../middleware/tokenDecode.js'
import {currentDateAndTIme} from '../validations/dateAndTime.js'

export async function registerTopic(req, res) {
    try {
        const {error} = validate(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const topic = await new Topic({
            ...req.body,
        }).save()

        res.status(201).send({
            topic,
            message: 'Topic Registered Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function getAllTopics(res) {
    try {
        const topics = await Topic.find({status: 0})

        res.status(200).send({
            topics,
            message: 'Topics Retrieved Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function getTopicByID(req, res) {
    try {
        const topicID = req.params.id

        const topics = await Topic.findById(topicID)

        if (topics) {
            return res.status(200).send({
                topics,
                message: 'Topic Retrieved Successfully',
            })
        }

        return res.status(404).send({
            message: 'No Topic Found for that Topic ID',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function getAllTopicsByGroupID(req, res) {
    try {
        const groupID = req.params.id

        const topics = await Topic.find({student_group_id: groupID})

        return res.status(200).send({
            topics,
            message: 'Topics Retrieved Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function deleteTopic(req, res) {
    try {
        const topicID = req.params.id

        await Topic.findByIdAndUpdate(topicID, {$set: {status: 1}})

        return res.status(200).send({
            message: 'Topics Deleted Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function changeApprovalStatus(req, res) {
    try {
        const topicID = req.params.id
        const status = req.body.status

        await Topic.findByIdAndUpdate(topicID, {
            $set: {is_approved: status},
        })

        return res.status(200).send({
            message: 'Topics Updated Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function updateTopic(req, res) {
    try {
        const {error} = validate(req.body)
        const topicId = req.params.id
        const modified_user = await decode(req)
        const modified_date = currentDateAndTIme()
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const topic = await Topic.findByIdAndUpdate(topicId, {
            ...req.body,
            modified_user,
            modified_date,
        })
        if (topic) {
            return res.status(200).send({
                message: `Topic ${topicId} updated  successfully`,
            })
        }
        res.status(404).send({message: `${topicId} Topic not found`})
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}
