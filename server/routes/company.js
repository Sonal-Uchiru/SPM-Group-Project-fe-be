import {saveCompany} from "../service/company.js";
import express from "express";

const companyRouter = express.Router()

companyRouter.post('/', saveCompany)


export {companyRouter}