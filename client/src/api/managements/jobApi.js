import { protectedApi } from "../protectedApi";
import { ErrorAlert } from "../../sweet_alerts/error";

export const getAllJobsByToken = async () => {
  try {
    return await protectedApi("get", "jobs");
  } catch (e) {
    await ErrorAlert();
  }
};

export const getAllJobs = async () => {
  try {
    return await protectedApi("get", "jobs/list");
  } catch (e) {
    await ErrorAlert();
  }
};

export const getJobById = async (id) => {
  try {
    return await protectedApi("get", `jobs/${id}`);
  } catch (e) {
    await ErrorAlert();
  }
};

export const addNewJobs = async (data) => {
  try {
    return await protectedApi("POST", "jobs", data);
  } catch (e) {
    await ErrorAlert();
  }
};

export const getJobsApplicants = async (companyId) => {
  try {
    return await protectedApi("GET", `jobs/companies/summary/${companyId}`);
  } catch (e) {
    await ErrorAlert();
  }
};

export const deleteJob = async (jobId) => {
  try {
    return await protectedApi("DELETE", `jobs/${jobId}`);
  } catch (e) {
    await ErrorAlert();
  }
};

export const getCompanyDataForJob = async () => {
  try {
    return await protectedApi("GET", "companies");
  } catch (e) {
    await ErrorAlert();
  }
};
