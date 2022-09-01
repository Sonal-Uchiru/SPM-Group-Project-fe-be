import { unProtectedApi } from "../unprotectedApi";
import { ErrorAlert } from "../../sweet_alerts/error";
import { protectedApi } from "../protectedApi";
import { authApi } from "../authApi";

export const saveUser = async (data) => {
  return await unProtectedApi("post", "users", data);
};

export const userLogin = async (data) => {
  return await authApi(data);
};

