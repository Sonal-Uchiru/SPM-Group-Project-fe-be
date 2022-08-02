import {decode} from '../middleware/tokenDecode.js'
import {Admin} from '../models/admin.js'
import {Student} from '../models/student.js'

export async function getAdminById(req, res) {
    try {
        const userId = await decode(req)
        const admin = await Admin.findById(userId)
        if (admin) {
            return res.status(200).json(admin)
        }
        return res.status(404).send({message: 'user not found'})
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

