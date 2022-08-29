import {unProtectedApi} from "../unprotectedApi";
import {ErrorAlert} from "../../sweet_alerts/error";
import {authApi} from "../authApi";
import {protectedApi} from "../protectedApi";

export const saveUser = async (data) => {
    return await unProtectedApi('post', 'users', data)
}

export const userLogin = async (data) => {
    return await authApi(data)
}

export const getUserDetails = async () => {
    return await protectedApi('get', 'users')
}

export const getUserAppliedJobs = async () => {
    return await protectedApi('get', 'jobApplications')
}