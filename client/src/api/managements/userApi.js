import {unProtectedApi} from "../unprotectedApi";
import {ErrorAlert} from "../../sweet_alerts/error";
import {authApi} from "../authApi";

export const saveUser = async (data) => {
    try {
        return await unProtectedApi('post', 'users', data)
    } catch (e) {
        await ErrorAlert()
    }
}

export const userLogin = async (data) => {
    try {
        return await authApi(data)
    } catch (e) {
        await ErrorAlert()
    }
}