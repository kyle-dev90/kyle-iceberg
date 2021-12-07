import * as redis from "redis"
import { Environment } from "../config/environment"

export const getRedisClient = () => {
    try {
        const client = redis.createClient({
            url: Environment.getRedisURL()
        })
        client.on("error", (err) => {
            console.log("Error " + err)
        })

        console.log("Redis Connected")

        return client
    } catch (error) {
        console.log("Redis connection failed")
        process.exit(1)
    }
}
