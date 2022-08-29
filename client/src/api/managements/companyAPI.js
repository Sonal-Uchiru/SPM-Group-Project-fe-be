import { unprotectedApi } from "../unprotectedApi";

export const createCompany = async (data) => {
  return await unprotectedApi("POST", "companies", data);
};
