import {getModel} from "./modelSelector.js";
import {decode} from "../middleware/tokenDecode.js";


export const updateByToken = async (req, res, modelName, validation) => {
    try {
        const id = await decode(req)
        const {error} = validation(req.body)

        if (error)
            return res.status(400).send({message: error.details[0].message})

        const Model = getModel(modelName)
        if (!Model) {
            return res.status(404).send({message: "model not found"});
        }

        const content = await Model.findByIdAndUpdate(id, {...req.body, updatedDate: new Date, modifiedUser: id._id})

        if (content) {
            return res.status(200).send({message: `${id._id} content updated successfully`})
        }

        res.status(404).send({message: `${modelName.toUpperCase()} model ${id._id} not found`})
    } catch (e) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}