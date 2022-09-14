import { protectedApi } from "../protectedApi";
import { unProtectedApi } from "../unprotectedApi";

export const createCompany = async (data) => {
  return await unProtectedApi("POST", "companies", data);
};

export const getCompany = async () => {
  return await protectedApi("GET", "companies");
};

export const getAllCompanies = async () => {
  return await protectedApi("GET", "companies/list");
};

export const getJobPostingsOfCompany = async (companyId) => {
  return await protectedApi("GET", `jobs/companies/summary/${companyId}`);
};

export const getApplicantsOfCompany = async (companyId) => {
  return await protectedApi(
    "GET",
    `jobApplications/companies/summary/${companyId}`
  );
};

export const updateCompany = async (data) => {
  return await protectedApi("PUT", "companies", data);
};

export const deleteCompanyProfile = async (data) => {
  return await protectedApi("delete", "companies", data);
};
