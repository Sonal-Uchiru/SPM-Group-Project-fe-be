import {protectedApi} from "../protectedApi";

export const getAllJobApplicationsByToken = async () => {
    try {
        return await protectedApi('get', 'jobApplications')
    } catch (e) {
        alert("oppps")
    }
}