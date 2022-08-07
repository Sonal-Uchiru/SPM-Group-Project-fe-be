import {getModel} from "./modelSelector.js";

export const deleteById = async (req, res, modelName) => {
    try {
        const Model = getModel(modelName)
        if (!Model) {
            return res.status(404).send({message: "model not found"});
        }

        if (!req.params.id) {
            return res.status(404).send({message: "id not found"});
        }

        const content = await Model.findByIdAndDelete(req.params.id)
        if (content) {
            return res.status(200).send({message: `${req.params.id} content deleted successfully`})
        }

        res.status(404).send({message: `${modelName.toUpperCase()} model ${req.params.id} not found`})
    } catch (e) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}