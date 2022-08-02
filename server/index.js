import env from 'dotenv'
import express from 'express'
import cors from 'cors'
import {connection} from './db.js'
import {userRouter} from "./routes/sample.js";

const app = express()

// env configuration
env.config()

// database connection
connection()

// Routes


// middlewares
app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)
const port = process.env.PORT || 8080

app.listen(port)
console.log(`Listening on port ${port}...`)
