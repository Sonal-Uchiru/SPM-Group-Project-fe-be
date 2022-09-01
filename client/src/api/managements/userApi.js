import {ErrorAlert} from "../../sweet_alerts/error";
import {protectedApi} from "../protectedApi";

export const getUser = async () => {
    try {
        return await protectedApi('get', 'users')
    } catch (e) {
        await ErrorAlert()
    }
}