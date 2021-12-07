import * as redis from "redis"
import axios from "axios"
import * as querystring from "querystring"
import { Environment } from "../config/environment"
import { ICampaign } from "../common/types"
import dotenv from "dotenv"

dotenv.config()

const client = redis.createClient({
    url: Environment.getRedisURL()
})
client.on("error", (error: Error) => {
    console.log(error)
})
;(async () => {
    await client.connect()
})()

export async function fetchAllComapigns() {
    try {
        const compaignsCache = await client.get("*")
        if (!compaignsCache) {
            const results = await axios.get(Environment.getAdServerURL() + "/*", {
                headers: {
                    "x-api-key": Environment.getXApiKey()
                }
            })

            await client.set("*", JSON.stringify(results.data))

            return {
                success: true,
                compaigns: JSON.stringify(results.data)
            }
        }

        return {
            success: true,
            compaigns: compaignsCache
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function fetchSingleCompaign(id: string) {
    try {
        const compaignCache = await client.get(id)

        if (!compaignCache) {
            const results = await axios.get(Environment.getAdServerURL() + `/${id}`, {
                headers: {
                    "x-api-key": Environment.getXApiKey()
                }
            })

            await client.set(id, JSON.stringify(results.data))

            return {
                success: true,
                compaigns: JSON.stringify(results.data)
            }
        }

        return {
            success: true,
            compaigns: compaignCache
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function addNewCompaign(compaign: ICampaign) {
    try {
        const response = await axios.post(
            Environment.getAdServerURL(),
            querystring.stringify({
                id: compaign.id,
                startDate: compaign.startDate,
                endDate: compaign.endDate,
                targetImpressions: compaign.targetImpressions
            }),
            {
                headers: { "x-api-key": Environment.getXApiKey() }
            }
        )

        if (response && response.data.id) {
            await flushCache()

            return {
                success: true,
                compaign: response.data.id
            }
        }
        return null
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function flushCache() {
    try {
        await client.flushDb()
    } catch (error) {
        console.log(error)
        return null
    }
}
