import express from "express"
import { Express } from "express-serve-static-core"
import cors from "cors"
import helmet from "helmet"
import routes from "../routes/routes"
import connectDB from "../config/db"
import dotenv from "dotenv"

export async function createServer(): Promise<Express> {
    const app = express()

    dotenv.config()

    await connectDB()

    app.use(helmet())
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded())
    app.use(routes)

    return app
}
