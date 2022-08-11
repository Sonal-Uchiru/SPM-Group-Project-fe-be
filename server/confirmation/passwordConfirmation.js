import bcrypt from "bcrypt";
import {validationDelete} from "../validations/user.js";

export const passwordConfirmation = async (req, res, userId, Model) => {
    try {
        const content = await Model.findById(userId)
        if (content) {
            return await bcrypt.compare(req.body.password, content.password)
        }

        return false
    } catch (e) {
        return res.status(500).send({message: 'Internal Server Error'})
    }
}