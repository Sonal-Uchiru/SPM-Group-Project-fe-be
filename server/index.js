import env from 'dotenv'
import express from 'express'
import cors from 'cors'
import {expressjwt as jwt} from 'express-jwt'
import {connection} from './database/db.js'
import {userRouter} from "./controller/user.js"
import {userRouter as unprotectedUserRouter} from "./routes/user.js"
import authRouter from "./routes/auth.js"
import {protectedUrl, url} from "./constant/api.js"
import {jobApplicationRouter} from "./controller/jobApplication.js";

const app = express()

// env configuration
env.config()

// database connection
connection()

// middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use(url.AUTHENTICATION, authRouter)
app.use(url.USER_MANAGEMENT, unprotectedUserRouter)

// Protected Routes
app.use(
    protectedUrl.USER_MANAGEMENT,
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}),
    userRouter
)
app.use(
    protectedUrl.JOB_APPLICATION_MANAGEMENT,
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}),
    jobApplicationRouter
)

const port = process.env.PORT || 8080

app.listen(port)
console.log(`Listening on port ${port}...`)
