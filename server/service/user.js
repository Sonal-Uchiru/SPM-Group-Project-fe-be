import {User} from '../models/user.js'
import {validatePost} from "../validations/user.js";
import bcrypt from "bcrypt";
import {getByToken} from "../shared/getByToken.js";

export const saveUser = async (req, res) => {
    try {
        const {error} = validatePost(req.body)
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const user = await User.findOne({email: req.body.email})
        if (user)
            return res
                .status(409)
                .send({message: 'User with given email already Exist!'})

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        await new User({...req.body, password: hashPassword}).save()
        res.status(201).send({message: 'User created successfully'})
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

export const getUserById = async (req, res) => {
    await getByToken(req, res, "user")
}

// export const getUserById = async (req, res) => {
//     await getById(req,res,"user")
// }
