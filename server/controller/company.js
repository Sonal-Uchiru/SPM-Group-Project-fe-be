import express from 'express'
import {
    deleteCompany,
    getAllCompanies,
    getCompany,
    updateCompany,
} from '../service/company.js'

const companyRouter = express.Router()

companyRouter.get('/list', getAllCompanies)
companyRouter.get('/', getCompany)
companyRouter.put('/', updateCompany)
companyRouter.delete('/', deleteCompany)

export { companyRouter }
