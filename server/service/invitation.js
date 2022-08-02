import {Invitation, validate} from '../models/invitation.js'

export async function createInvitation(req, res) {
    try {
        const {error} = validate(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const invitation = await new Invitation({
            ...req.body,
        }).save()

        res.status(201).send({
            invitation,
            message: 'Invitation Created Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}

export async function deleteInvitation(req, res) {
    try {
        const invitationID = req.params.id

        await Invitation.findByIdAndDelete(invitationID)

        return res.status(200).send({
            message: 'Invitation Deleted Successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log(error)
    }
}
