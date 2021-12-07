import cors from "cors"
import helmet from "helmet"
import Server from "./server"

const server = Server
const app = server.app

// to allow all origins for the dev
app.use(helmet())
app.use(cors())

server.run()
