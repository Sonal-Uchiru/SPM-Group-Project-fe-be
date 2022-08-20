import {protectedApi} from "../protectedApi";
import {ErrorAlert} from "../../sweet_alerts/error";

export const getAllJobApplicationsByToken = async () => {
    try {
        return await protectedApi('get', 'jobApplications')
    } catch (e) {
        alert("oppps")
    }
}

export const saveJobApplication = async (data) => {
    try {
        return await protectedApi('post', 'jobApplications', data)
    } catch (e) {
        await ErrorAlert()
    }
}

export const getAppliedJobApplications = async () => {
    try {
        return await protectedApi('get', 'jobApplications')
    } catch (e) {
        await ErrorAlert()
    }
}

export const getAppliedJobApplicationsByJobId = async (id) => {
    try {
        return await protectedApi('get', `jobApplications/jobs/${id}`)
    } catch (e) {
        await ErrorAlert()
    }
}

export const deleteJobApplication = async (id) => {
    try {
        return await protectedApi('delete', `jobApplications/${id}`)
    } catch (e) {
        await ErrorAlert()
    }
}