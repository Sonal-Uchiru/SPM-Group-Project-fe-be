import {decode} from "../middleware/tokenDecode.js";
import {getModel} from "./modelSelector.js";

export const getAllContentByToken = async (req, res, modelName, key) => {
    try {
        const id = await decode(req)
        const Model = getModel(modelName)

        if (!Model) {
            return res.status(404).send({message: "model not found"});
        }

        const content = await Model.find({key: id._id})

        if (content) {
            return res.status(200).json(content)
        }
        return res.status(404).send({message: `${modelName.toUpperCase()} model ${id} not found`});
    } catch (e) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}