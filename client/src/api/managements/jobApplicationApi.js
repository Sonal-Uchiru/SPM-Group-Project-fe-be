import {protectedApi} from "../protectedApi";

export const saveJobApplication = async (data) => {
        return await protectedApi('post', 'jobApplications', data)
}

export const updateJobApplication = async (data, id) => {
        return await protectedApi('put', `jobApplications/${id}`, data)
}

export const getAppliedJobApplications = async () => {
        return await protectedApi('get', 'jobApplications')
}

export const getAppliedJobApplicationsByJobId = async (id) => {
        return await protectedApi('get', `jobApplications/jobs/${id}`)
}

export const deleteJobApplication = async (id) => {
        return await protectedApi('delete', `jobApplications/${id}`)
}

export const getJobApplicationById = async (id) => {
        return await protectedApi('get', `jobApplications/${id}`)
}

export const updateJobApplicationStatus = async (id, data) => {
        return await protectedApi('patch', `jobApplications/${id}`, data)
}

export const isApplied = async (id) => {
        return await protectedApi('get', `jobApplications/isApplied/${id}`)
}

