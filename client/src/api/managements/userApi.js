import {unProtectedApi} from "../unprotectedApi";
import {ErrorAlert} from "../../sweet_alerts/error";

export const saveUser = async (data) => {
    try {
        return await unProtectedApi('post', 'users', data)
    } catch (e) {
        await ErrorAlert()
    }
}