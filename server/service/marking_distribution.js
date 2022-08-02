import {decode} from '../middleware/tokenDecode.js'
import {currentDateAndTIme} from '../validations/dateAndTime.js'
import {
    MarkingDistribution,
    validate,
} from '../models/marking_distribution.js'

export async function createMarkingDistribution(req, res) {
    try {
        const {error} = validate(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const markingScheme = await new MarkingDistribution({
            ...req.body,
        }).save()

        res.status(201).send({
            markingScheme,
            message: 'Marking Distribution created successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export async function getMarkingDistributionBySchemeId(req, res) {
    try {
        const marking_scheme_id = req.params.id
        const markingDistributionList = await MarkingDistribution.find({
            marking_scheme_id,
        })
        res.status(200).send({
            markingDistributionList,
            message: `Marking Distributions retrieved  for ${marking_scheme_id} successfully`,
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export async function deleteMarkingDistributionById(req, res) {
    try {
        const id = req.params.id
        const markingDistribution = await MarkingDistribution.findByIdAndDelete(
            id
        )
        if (markingDistribution) {
            return res.status(200).send({
                message: `Marking Distribution ${id} deleted  successfully`,
            })
        }

        res.status(404).send({
            message: `${id} Marking Distribution not found`,
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export async function updateMarkingDistributionById(req, res) {
    try {
        const {error} = validate(req.body)
        const id = req.params.id
        const modified_user = await decode(req)
        const modified_date = currentDateAndTIme()
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const markingScheme = await MarkingDistribution.findByIdAndUpdate(id, {
            ...req.body,
            modified_user,
            modified_date,
        })
        if (markingScheme) {
            return res.status(200).send({
                message: `Marking Distribution ${id} updated  successfully`,
            })
        }
        res.status(404).send({
            message: `${id} Marking Distribution not found`,
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}
