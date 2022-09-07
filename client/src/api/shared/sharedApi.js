import { protectedApi } from "../protectedApi";

export const changePassword = async (data, type) => {
  return await protectedApi("PUT", `${type}/password`, data);
};
