import {User} from "../models/user.js";
import {Company} from "../models/company.js";
import {Job} from "../models/job.js";
import {JobApplication} from "../models/jobApplication.js";

export const getModel = (name) => {
    let model = null
    switch (name) {
        case 'user':
            model = User;
            break;
        case 'company':
            model = Company;
            break;
        case 'job' :
            model = Job
            break;
        case 'jobApplication' :
            model = JobApplication
            break;
    }
    return model;
}