import {decode} from "../middleware/tokenDecode.js";
import {getModel} from "./modelSelector.js";
import {passwordConfirmation} from "../confirmation/passwordConfirmation.js";
import {validationDelete} from "../validations/user.js";

export const deleteByToken = async (req, res, modelName) => {
    try {
        const id = await decode(req)
        const Model = getModel(modelName)

        const {error} = validationDelete(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})


        if (!Model) {
            return res.status(404).send({message: "model not found"});
        }

        const isPasswordValid = await passwordConfirmation(req, res, id, Model);

        if (!isPasswordValid) return res.status(401).json({message: `Invalid Credentials`})

        const content = await Model.findByIdAndDelete(id)

        if (content) {
            return res.status(200).json({message: `${id._id} content deleted successfully`})
        }

        return res.status(404).send({message: `${modelName.toUpperCase()} model ${id._id} not found`});
    } catch (e) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}
