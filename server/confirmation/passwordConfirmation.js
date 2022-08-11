import bcrypt from "bcrypt";
import {validationDelete} from "../validations/user.js";

export const passwordConfirmation = async (req, res, userId, Model) => {
    try {
        const {error} = validationDelete(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const content = await Model.findById(userId)

        if (!content) return res.status(404).send({message: `${Model.toUpperCase()} model ${userId} not found`})

        return await bcrypt.compare(req.body.password, content.password)


    } catch (e) {
        return res.status(500).send({message: 'Internal Server Error'})
    }
}