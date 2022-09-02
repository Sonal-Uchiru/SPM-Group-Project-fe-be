import { protectedApi } from "../protectedApi";
import { ErrorAlert } from "../../sweet_alerts/error";

export const getAllJobsByToken = async () => {
    return await protectedApi("get", "jobs");
};

export const getAllJobs = async () => {
    return await protectedApi("get", "jobs/list");
};

export const getJobById = async (id) => {
    return await protectedApi("get", `jobs/${id}`);
};

export const addNewJobs = async (data) => {
    return await protectedApi("POST", "jobs", data);
};

export const getJobsApplicants = async (companyId) => {
    return await protectedApi("GET", `jobs/companies/summary/${companyId}`);
};

export const deleteJob = async (jobId) => {
    return await protectedApi("DELETE", `jobs/${jobId}`);
};

export const getCompanyDataForJob = async () => {
    return await protectedApi("GET", "companies");
};
