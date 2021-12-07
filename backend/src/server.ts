import * as express from "express"
import * as http from "http"
import { Environment } from "./config/environment"
import connectDB from "./config/db"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"
import { swaggerOptions } from "./swagger/config"
import Routes from "./routes/routes"

dotenv.config()

interface AddressInfo {
    address: string
    family: string
    port: number
}

class Server {
    public app: express.Application
    public server: http.Server
    public port = process.env.PORT || 5000

    constructor() {
        this.app = express.default()
    }

    public async run(): Promise<void> {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        this.app.use(Routes)

        const specs = swaggerJsdoc(swaggerOptions)
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))

        await connectDB()

        this.server = this.app.listen(this.port)
        this.server.on("error", (err: Error) => this.onError(this.server, err))
        this.server.on("listening", () => this.onListening)
        console.debug("Server was started on environment %s", Environment.getName())
        console.log(`Listening on ${this.bind(this.server.address())}`)
    }

    public close(): void {
        this.server.close()
    }

    private onListening = (server: http.Server): void => {
        console.log(`Listening on ${this.bind(server.address())}`)
    }

    private onError(server: http.Server, error: NodeJS.ErrnoException): void {
        if (error["syscall"] !== "listen") {
            throw error
        }
        const addr = server.address()
        // handle specific listen errors with friendly messages
        switch (error["code"]) {
            case "EACCES":
                console.error(`${this.bind(addr)} requires elevated privileges`)
                process.exit(1)
                break
            case "EADDRINUSE":
                console.error(`${this.bind(addr)} is already in use`)
                process.exit(1)
                break
            default:
                throw error
        }
    }

    private bind(addr: string | AddressInfo | null): string {
        return typeof addr === "string" ? `pipe ${addr}` : `port ${this.port}`
    }
}

export default new Server()
