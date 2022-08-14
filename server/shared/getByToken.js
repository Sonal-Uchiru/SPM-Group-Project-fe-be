import { decode } from '../middleware/tokenDecode.js'
import { getModel } from './modelSelector.js'

export const getByToken = async (req, res, modelName) => {
    try {
        const id = await decode(req)
        const Model = getModel(modelName)

        if (!Model) {
            return res.status(404).send({ message: 'model not found' })
        }

        const content = await Model.findOne(id)

        if (content) {
            return res.status(200).json(content)
        }
        return res.status(404).send({
            message: `${modelName.toUpperCase()} model ${id} not found`,
        })
    } catch (e) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}
