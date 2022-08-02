import {Panel, validate} from '../models/panel.js'
import {decode} from '../middleware/tokenDecode.js'
import {currentDateAndTIme} from '../validations/dateAndTime.js'

import {allocateGroupsToPanels} from './student_group.js'

import {
    allocateStaffToPanels,
} from './staff.js'

import {ObjectId} from 'mongodb'


export async function createPanel(req, res) {

    try {
        let memberArray = req.body.member_array;
        var memberAllocation = '';
        const {error} = validate(req.body)

        if (error)
            return res.status(400).send({message: error.details[0].message})

        const newPanel = await new Panel({
            ...req.body
        }).save();

        //If possible check whether staff update part can go wrong and catch that error too
        memberAllocation = await allocateStaffToPanels(memberArray, newPanel._id)

        res.status(201).send({
            newPanel,
            message: 'Panel created successfully',
        })

    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export async function getAllPanels(req, res) {
    try {
        const panelList = await Panel.aggregate([
            {"$addFields": {"inchargeID": {"$toObjectId": "$in_charge_id"}}},
            {
                $lookup: {
                    from: "staffs",
                    localField: "inchargeID",
                    foreignField: "_id",
                    as: "panelIncharge"
                }
            },
        ])
        let message = "";
        let status = ''
        if (panelList.length) {
            status = 200
            message = "Data fetched successfully"

        } else {
            status = 404
            message = "There are no active panels"
        }
        res.status(status).send({
            panelList,
            message: message
        })

    } catch (error) {
        res.status(500).json({message: error.message});

    }
}

export async function getPanelByID(req, res) {
    try {
        const panelID = req.params.id

        const panelObj = await Panel.aggregate([
            {
                $match: {_id: ObjectId(panelID)}
            },
            {"$addFields": {"panelID": {"$toString": "$_id"}}},
            {
                $lookup: {
                    from: "staffs",
                    localField: "panelID",
                    foreignField: "panel_id",
                    as: "memberResult"
                }
            },
            {
                $lookup: {
                    from: "studentgroups",
                    localField: "panelID",
                    foreignField: "evaluation_panel_id",
                    as: "groupResult"
                }
            },
            {
                $lookup: {
                    from: "studentgroups",
                    localField: "panelID",
                    foreignField: "presentation_panel_id",
                    as: "presentationResult"
                }
            },
        ])

        let message = "";
        let status = ''

        if (!panelObj.length) {
            status = 404
            message = `There are no active panels by ID '${panelID}' `;
        } else {
            status = 200
            message = `Panel '${panelID}' retrieved successfully`
        }

        res.status(status).send({
            panelObj,
            message: message
        })

    } catch (error) {
        res.status(500).json({message: error.message});

    }
}

// export async function getPanelByIDAndType(req, res) {
//     try {
//         const panelID = req.params.id
//         const panelType = req.params.type
//
//
//         const panelObj = await Panel.aggregate([
//             {
//                 // $match : { and: [ { _id: ObjectId(panelID)} ] }
//                 $match: {
//                     $and: [
//                         { _id: ObjectId(panelID)},
//                         { panel_type:  panelType }
//                     ]
//                 }
//
//             },
//             { "$addFields": { "panelID": { "$toString": "$_id" }}},
//             {
//                 $lookup: {
//                     from: "staffs",
//                     localField: "panelID",
//                     foreignField: "panel_id",
//                     as: "memberResult"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "studentgroups",
//                     localField: "panelID",
//                     foreignField: "evaluation_panel_id",
//                     as: "groupResult"
//                 }
//             },
//         ])
//
//         let message = "";
//         let status = ''
//
//         if(!panelObj.length){
//             status = 404
//             message = `There are no active panels by ID '${panelID}' or by type '${panelType}'`;
//         }else{
//             status = 200
//             message = `Panel id '${panelID}' and type '${panelType}' retrieved successfully`
//         }
//
//         res.status(status).send({
//             panelObj,
//             message: message
//         })
//
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//
//     }
// }

export async function allocateGroupsToPanel(req, res) {
    try {
        const modified_user = await decode(req);
        const modified_date = currentDateAndTIme()
        const panelID = req.params.id
        const groupArray = req.body.group_array
        const panelType = req.body.PanelType


        const panelObj = await Panel.findByIdAndUpdate(panelID, {
            modified_user,
            modified_date,
        })

        let groupResult = await allocateGroupsToPanels(groupArray, panelID, panelType)


        let message = "";
        let status = ''

        if (panelObj === null) {
            status = 404
            message = `There are no active panels by ID '${panelID}' `;
        } else {
            status = 200
            message = `Groups asigned to panel '${panelID}' successfully`
        }

        res.status(status).send({
            message: message
        })

    } catch (error) {
        res.status(500).json({message: error.message});

    }
}
