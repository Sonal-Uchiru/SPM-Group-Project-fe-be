import express from 'express'

const panelRouter = express.Router()

import {
    allocateGroupsToPanel,
    createPanel,
    getAllPanels,
    getPanelByID,
} from '../service/panel.js'

panelRouter.post("/", createPanel);
panelRouter.get("/", getAllPanels);
panelRouter.get("/:id", getPanelByID);
panelRouter.patch("/:id", allocateGroupsToPanel);


export default panelRouter;