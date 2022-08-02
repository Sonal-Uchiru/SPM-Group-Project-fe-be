import {Student} from '../models/student.js'
import {Staff} from '../models/staff.js'
import {Admin} from '../models/admin.js'

export async function CheckEmailExists(email) {
    let user = await Student.findOne({email})
    if (user) return true

    user = await Staff.findOne({email})
    if (user) return true

    user = await Admin.findOne({email})
    return !!user
}

export async function CheckUsername(username) {
    let user = await Staff.findOne({username})
    return !!user;
}
