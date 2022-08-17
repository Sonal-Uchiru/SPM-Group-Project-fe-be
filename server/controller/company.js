import express from 'express'
import {
    deleteCompany,
    getAllCompanies,
    getCompany,
    updateCompany, updatePassword,
} from '../service/company.js'

const companyRouter = express.Router()

companyRouter.get('/list', getAllCompanies)
companyRouter.get('/', getCompany)
companyRouter.put('/', updateCompany)
companyRouter.put('/password', updatePassword)
companyRouter.delete('/', deleteCompany)

export {companyRouter}
