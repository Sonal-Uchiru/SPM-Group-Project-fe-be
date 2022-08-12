import express from 'express'
import {getAllCompanies} from "../service/company.js";

const companyRouter = express.Router()

companyRouter.get('/', getAllCompanies)

export {companyRouter}