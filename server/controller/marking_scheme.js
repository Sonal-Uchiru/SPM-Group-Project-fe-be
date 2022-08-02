import express from 'express'
import {
    createMarkingScheme,
    getMarkingSchemeById,
    getAllMarkingSchemes,
    deleteMarkingSchemeById, updateMarkingSchemeById,
} from '../service/marking_scheme.js'

const markingSchemeRouter = express.Router()

markingSchemeRouter.post('/', async (req, res) => {
    await createMarkingScheme(req, res)
})

markingSchemeRouter.get('/:id', async (req, res) => {
    await getMarkingSchemeById(req, res)
})

markingSchemeRouter.get('/', async (req, res) => {
    await getAllMarkingSchemes(req, res)
})

markingSchemeRouter.delete('/:id', async (req, res) => {
    await deleteMarkingSchemeById(req, res)
})

markingSchemeRouter.put("/:id", async (req, res) => {
    await updateMarkingSchemeById(req, res)
})

export default markingSchemeRouter
