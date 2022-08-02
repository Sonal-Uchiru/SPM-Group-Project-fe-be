import {MarkingScheme, validate} from '../models/marking_scheme.js'
import {decode} from '../middleware/tokenDecode.js'
import {currentDateAndTIme} from '../validations/dateAndTime.js'
import {ObjectId} from 'mongodb'

export async function createMarkingScheme(req, res) {
    try {
        const {error} = validate(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const markingScheme = await new MarkingScheme({
            ...req.body,
        }).save()

        res.status(201).send({
            markingScheme,
            message: 'Marking Scheme created successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export async function getAllMarkingSchemes(req, res) {
    try {
        const markingSchemeList = await MarkingScheme.find({status: 0})
        res.status(200).send({
            markingSchemeList,
            message: 'Marking Scheme retrieved  successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export async function getMarkingSchemeById(req, res) {
    try {
        const id = req.params.id
        // const markingScheme = await MarkingScheme.findById(id,{status : 0})
        const markingScheme = await MarkingScheme.aggregate([
            {
                $match: {_id: ObjectId(id)}
            },
            {"$addFields": {"schemeID": {"$toString": "$_id"}}},
            {
                $lookup: {
                    from: "markingdistributions",
                    localField: "schemeID",
                    foreignField: "marking_scheme_id",
                    as: "distributionList"
                }
            },
        ])

        if (markingScheme) {
            return res.status(200).send({
                markingScheme,
                message: `Marking Scheme ${id} retrieved  successfully`,
            })
        }

        res.status(404).send({message: `${id} Marking Scheme not found`})
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export async function deleteMarkingSchemeById(req, res) {
    try {
        const id = req.params.id
        const modified_user = await decode(req)
        const modified_date = currentDateAndTIme()
        const markingScheme = await MarkingScheme.findByIdAndUpdate(id, {
            $set: {
                status: 1,
                modified_user,
                modified_date,
            },
        })
        if (markingScheme) {
            return res.status(200).send({
                message: `Marking Scheme ${id} deleted  successfully`,
            })
        }
        res.status(404).send({message: `${id} Marking Scheme not found`})
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export async function updateMarkingSchemeById(req, res) {
    try {
        const {error} = validate(req.body)
        const id = req.params.id
        const modified_user = await decode(req)
        const modified_date = currentDateAndTIme()
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const markingScheme = await MarkingScheme.findByIdAndUpdate(id, {
            ...req.body,
            modified_user,
            modified_date,
        })
        if (markingScheme) {
            return res.status(200).send({
                message: `Marking Scheme ${id} updated  successfully`,
            })
        }
        res.status(404).send({message: `${id} Marking Scheme not found`})
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}
