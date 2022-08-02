import env from 'dotenv'

env.config()
import express from 'express'

const app = express()
import cors from 'cors'
import {connection} from './db.js'
import panelRouter from './controller/panel.js'
import authRouter from './routes/auth.js'
import {expressjwt as jwt} from 'express-jwt'
import adminRouter from './controller/admin.js'
import studentRouter from './controller/student.js'
import staffRouter from './controller/staff.js'
import password_recovery from './controller/password_recovery.js'
import topicRouter from './controller/topic.js'
import markingSchemeRouter from './controller/marking_scheme.js'
import markingDistributionRouter from './controller/marking_distribution.js'
import submissionTypeRouter from './controller/submissionType.js'
import studentSubmissionRouter from './controller/studentSubmission.js'
import invitationRouter from './controller/invitation.js'
import requestRouter from './controller/request.js'
import studentGroupRouter from './controller/student_group.js'

// database connection
connection()

// middlewares
app.use(express.json())
app.use(cors())

// routes
app.use('/api/auth', authRouter)
app.use('/api/auth/passwordRecovery', password_recovery)

// protected routes
app.use(
    '/api/admins',
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}),
    adminRouter
)

app.use(
    '/api/students',
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}).unless({
        path: ['/api/students/signup'],
    }),
    studentRouter
)

app.use(
    '/api/staffs',
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}).unless({
        path: ['/api/staffs/signup'],
    }),
    staffRouter
)

app.use(
    '/api/topics',
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}),
    topicRouter
)

app.use(
    '/api/markingSchemes',
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}),
    markingSchemeRouter
)

app.use(
    '/api/markingDistribution',
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}),
    markingDistributionRouter
)
app.use(
    '/api/panels',
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}),
    panelRouter
)
app.use(
    '/api/submissionType',
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}),
    submissionTypeRouter
)
app.use(
    '/api/studentSubmission',
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}),
    studentSubmissionRouter
)

app.use(
    '/api/invitations',
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}),
    invitationRouter
)

app.use(
    '/api/requests',
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}),
    requestRouter
)

app.use(
    '/api/studentGroups',
    jwt({secret: process.env.JWTPRIVATEKEY, algorithms: ['HS256']}),
    studentGroupRouter
)

const port = process.env.PORT || 8080

app.listen(port)
console.log(`Listening on port ${port}...`)
