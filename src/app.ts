import "dotenv/config"

import http from "http"
import cors from 'cors'
import express from 'express'
import { router } from "./routes"

const app = express()

app.use(cors())
const serverHttp = http.createServer(app)

app.use(express.json())

app.use(router)


export {serverHttp}