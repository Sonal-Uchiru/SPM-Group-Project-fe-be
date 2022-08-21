import { protectedApi } from "../protectedApi";

export const getAllJobsByToken = async () => {
  try {
    return await protectedApi("get", "jobs");
  } catch (e) {
    alert("oppps");
  }
};

export const addNewJobs = async (data) => {
  try {
    return await protectedApi("POST", "jobs", data);
  } catch (e) {
    alert("oppps");
  }
};

export const getJobsApplicants = async (companyId) => {
  try {
    return await protectedApi("GET", `jobs/companies/summary/${companyId}`);
  } catch (e) {
    alert("oppps");
  }
};

export const deleteJob = async (jobId) => {
  try {
    return await protectedApi("DELETE", `jobs/${jobId}`);
  } catch (e) {
    alert("oppps");
  }
};

export const getCompanyDataForJob = async () => {
  try {
    return await protectedApi("GET", "companies");
  } catch (e) {
    alert("oppps");
  }
};
