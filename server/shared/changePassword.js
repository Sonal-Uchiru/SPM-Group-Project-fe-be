import {decode} from "../middleware/tokenDecode.js";
import {validate} from "../validations/changePassword.js";
import {getModel} from "./modelSelector.js";
import bcrypt from "bcrypt";

export const changePassword = async (req, res, modelName) => {
    try {
        const {error} = validate(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const id = await decode(req)

        const Model = await getModel(modelName)

        if (!Model) {
            return res.status(404).send({message: "model not found"});
        }

        const content = await Model.findById(id._id)

        if (!await validatePassword(req.body.password, content.password)) {
            return res.status(401).send({message: 'Invalid Credentials'})
        }

        const hashedPassword = await hashPassword(req.body.newPassword)

        await Model.findByIdAndUpdate(id._id, {
            $set: {
                password: hashedPassword,
                updatedDate: new Date(),
                modifiedUser: id._id,
            }
        })

        res.status(200).send({message: 'Password updated successfully'})

    } catch (e) {
        console.log(e)
        res.status(500).send({message: 'Internal Server Error'})
    }
}

const validatePassword = async (currentPassword, hashPassword) => {
    return await bcrypt.compare(currentPassword, hashPassword);
}

const hashPassword = async (newPassword) => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    return await bcrypt.hash(newPassword, salt)
}