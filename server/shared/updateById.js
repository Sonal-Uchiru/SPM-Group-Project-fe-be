import {getModel} from "./modelSelector.js";
import {decode} from "../middleware/tokenDecode.js";


export const updateById = async (req, res, modelName, validation) => {
    try {
        const {error} = validation(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const Model = getModel(modelName)
        if (!Model) {
            return res.status(404).send({message: "model not found"});
        }

        if (!req.params.id) {
            return res.status(404).send({message: "id not found"});
        }

        const userId = await decode(req)

        const content = await Model.findByIdAndUpdate(req.params.id, {
            ...req.body,
            updatedDate: new Date,
            modifiedUser: userId._id
        })
        if (content) {
            return res.status(200).send({message: `${req.params.id} content updated successfully`})
        }

        res.status(404).send({message: `${modelName.toUpperCase()} model ${req.params.id} not found`})
    } catch (e) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}