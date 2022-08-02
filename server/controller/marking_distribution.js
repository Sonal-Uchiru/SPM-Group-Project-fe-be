import express from 'express'
import {
    createMarkingDistribution,
    deleteMarkingDistributionById,
    getMarkingDistributionBySchemeId,
    updateMarkingDistributionById,
} from '../service/marking_distribution.js'

const markingDistributionRouter = express.Router()

markingDistributionRouter.post('/', async (req, res) => {
    await createMarkingDistribution(req, res)
})

markingDistributionRouter.get('/:id', async (req, res) => {
    await getMarkingDistributionBySchemeId(req, res)
})

markingDistributionRouter.delete('/:id', async (req, res) => {
    await deleteMarkingDistributionById(req, res)
})

markingDistributionRouter.put('/:id', async (req, res) => {
    await updateMarkingDistributionById(req, res)
})

export default markingDistributionRouter
