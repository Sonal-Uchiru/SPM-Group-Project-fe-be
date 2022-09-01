import { protectedApi } from "../protectedApi";
import { unProtectedApi } from "../unprotectedApi";

export const createCompany = async (data) => {
  return await unProtectedApi("POST", "companies", data);
};

export const getCompany = async () => {
  return await protectedApi("GET", "companies");
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

