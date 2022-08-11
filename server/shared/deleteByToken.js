import {decode} from "../middleware/tokenDecode.js";
import {getModel} from "./modelSelector.js";

export const deleteByToken = async (req, res, modelName) => {
    try {
        const id = await decode(req)
        const Model = getModel(modelName)

        if (!Model) {
            return res.status(404).send({message: "model not found"});
        }

        const content = await Model.findByIdAndDelete(id)

        if (content) {
            return res.status(200).json({message: `${id._id} content deleted successfully`})
        }

        return res.status(404).send({message: `${modelName.toUpperCase()} model ${id._id} not found`});
    } catch (e) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}