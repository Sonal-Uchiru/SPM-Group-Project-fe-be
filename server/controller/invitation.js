import express from 'express'
import {createInvitation, deleteInvitation} from '../service/invitation.js'

const invitationRouter = express.Router()

invitationRouter.post('/', async (req, res) => {
    await createInvitation(req, res)
})

invitationRouter.delete('/:id', async (req, res) => {
    await deleteInvitation(req, res)
})

export default invitationRouter
