import express from 'express'
import {
    registerTopic,
    getAllTopics,
    getTopicByID,
    getAllTopicsByGroupID,
    deleteTopic,
    updateTopic,
    changeApprovalStatus,
} from '../service/topic.js'

const topicRouter = express.Router()

topicRouter.post('/', async (req, res) => {
    await registerTopic(req, res)
})

topicRouter.get('/', async (req, res) => {
    await getAllTopics(res)
})

topicRouter.get('/:id', async (req, res) => {
    await getTopicByID(req, res)
})

topicRouter.get('/groups/:id', async (req, res) => {
    await getAllTopicsByGroupID(req, res)
})

topicRouter.patch('/:id', async (req, res) => {
    await deleteTopic(req, res)
})

topicRouter.put('/:id', async (req, res) => {
    await updateTopic(req, res)
})

topicRouter.patch('/approvals/:id', async (req, res) => {
    await changeApprovalStatus(req, res)
})
export default topicRouter
