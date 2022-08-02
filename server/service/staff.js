import bcrypt from 'bcrypt'
import {
    CheckEmailExists,
    CheckUsername,
} from '../validations/userAlreadyExist.js'
import {currentDateAndTIme} from '../validations/dateAndTime.js'
import {Staff, validate} from '../models/staff.js'
import {Student} from '../models/student.js'
import {decode} from '../middleware/tokenDecode.js'

export async function createStaff(req, res) {
    try {
        const {error} = validate(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const isEmailExist = await CheckEmailExists(req.body.email)
        const isUserNameExist = await CheckUsername(req.body.username)

        if (isEmailExist)
            return res
                .status(409)
                .send({message: 'User with given email already Exist!'})

        if (isUserNameExist) {
            return res
                .status(409)
                .send({message: 'User with given username already Exist!'})
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const staff = await new Staff({
            ...req.body,
            password: hashPassword,
        }).save()

        res.status(201).send({
            staff,
            message: 'Staff created successfully',
        })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}


//Get All Staff Members
export function getAllStaff(req, res) {
    Staff.find()
        .then((staff) => {
            return res.status(200).send({
                staff,
                message: 'Staff retrieved successfully',
            })
        })
        .catch((error) => {
            return res.status(500).send({message: 'Internal Server Error'})
        });
}


//Get One Staff Member
export async function getOneStaff(req, res) {
    const userID = await decode(req)
    const staff = await Staff.findById(userID)
        .then((staff) => {
            return res.status(200).send({
                staff,
                message: 'Staff Member retrieved successfully',
            })
        })
        .catch((error) => {
            return res.status(500).send({message: 'Internal Server Error'})
        });
}

//Get Staff Members By Panel ID
export async function getStaffByPanel(req, res) {
    let panel_id = req.params.id;
    const staff = await Staff.find({panel_id})
        .then((staff) => {
            if (staff) {
                return res.status(200).send({
                    staff,
                    message: `Staff members retrieved successfully with panel ID ${panel_id}`,
                })
            }
            return res.status(404).send({
                staff,
                message: `Staff members Not Found with this panel ID ${panel_id}`,
            })

        })
        .catch((error) => {
            return res.status(500).send({message: 'Internal Server Error'})
        });
}


//Update Staff Member
export async function updateStaff(req, res) {
    const userID = await decode(req)
    const update = Staff.findByIdAndUpdate(userID, {...req.body})
        .then(() => {
            return res.status(200).send({
                message: `Staff profile updated successfully`,
            })
        })
        .catch((error) => {
            return res.status(500).send({message: 'Internal Server Error'})
        });
}


//Update Staff By Admin
export async function adminUpdateStaff(req, res) {
    let userID = req.params.id;
    const update = Staff.findByIdAndUpdate(userID, {...req.body})
        .then(() => {
            return res.status(200).send({
                message: `Staff profile updated successfully`,
            })
        })
        .catch((error) => {
            return res.status(500).send({message: 'Internal Server Error'})
        });
}


// Delete Staff Member By Admin
export async function adminDeleteStaff(req, res) {
    let userID = req.params.id;
    await Staff.findByIdAndDelete(userID)
        .then(() => {
            return res.status(200).send({
                message: 'Staff Member deleted successfully',
            })
        })
        .catch((error) => {
            return res.status(500).send({message: 'Internal Server Error'})
        });
}

// Delete Staff
export async function deleteStaff(req, res) {
    const userID = await decode(req)
    const isValid = await checkPassword(req, userID)

    if (isValid) {
        await Staff.findByIdAndDelete(userID)
            .then(() => {
                res.status(200).send({
                    message: 'Staff member deleted successfully',
                })
            })
            .catch((error) => {
                res.status(500).send({message: 'Internal Server Error'})
            })
        return
    }
    return res.status(401).send({message: 'Invalid Credentials'})
}

//Change Password
export async function changePassword(req, res) {
    const userID = await decode(req)
    const isValid = await checkPassword(req, userID)

    if (isValid) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.new_password, salt)
        await Staff.findByIdAndUpdate(userID, {
            $set: {
                password: hashPassword,
                modified_date: currentDateAndTIme(),
                modified_user: userID
            }
        })
            .then(() => {
                res.status(200).send({
                    message: 'Staff member changed password successfully',
                })
            })
            .catch((error) => {
                res.status(500).send({message: 'Internal Server Error'})
            });
        return
    }
    return res.status(401).send({message: 'Invalid Credentials'})
}

// Check Password
async function checkPassword(req, userID) {
    const user = await Staff.findById(userID)
    if (user) {
        return await bcrypt.compare(req.body.password, user.password);
    }
}


export async function allocateStaffToPanels(staffArray, panelID) {
    try {
        let i = 0;
        for (i; i < staffArray.length; i++) {
            await Staff.findByIdAndUpdate(staffArray[i], {
                panel_id: panelID
            })
        }
        return 'success'

    } catch (error) {
        // res.status(500).send({ message: 'Internal Server Error' })
    }
}


