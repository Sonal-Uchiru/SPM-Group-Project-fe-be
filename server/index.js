import env from 'dotenv'
import express from 'express'
import cors from 'cors'
import {connection} from './db.js'

const app = express()

// env configuration
env.config()

// database connection
connection()

// middlewares
app.use(express.json())
app.use(cors())


const port = process.env.PORT || 8080

app.listen(port)
console.log(`Listening on port ${port}...`)
