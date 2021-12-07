import faker from "faker"
import request from "supertest"
import * as http from "http"
import { createServer } from "../../common/testServer"

let server: http.Server
let token: string

beforeAll(async () => {
    server = (await createServer()).listen()
})

afterAll(async () => {
    server.close()
})

const compaign1 = {
    startDate: 1636416000000,
    endDate: 1636761600000,
    targetImpressions: 6543
}

const compaign2 = {
    id: faker.datatype.uuid(),
    startDate: 1636416000000,
    endDate: 1636761600000,
    targetImpressions: 6543
}

const profile = {
    email: faker.internet.email(),
    password: faker.internet.password(15, false, /^[A-Za-z]*$/, "164"),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName()
}

describe("add", () => {
    it("should return 401 with without authorization header", async () => {
        await request(server).post(`/api/v1/compaigns`).send(compaign1).expect(401)
    }, 30000)

    it("should return 200 with valid user registration", async () => {
        const auth = await request(server).post(`/api/v1/register`).send(profile).expect(200)
        token = auth.body.token
    }, 30000)

    it("should return 400 with without id on payload", async () => {
        await request(server)
            .post(`/api/v1/compaigns`)
            .set("Authorization", `Bearer ${token}`)
            .send(compaign1)
            .expect(400)
    }, 30000)

    it("should return 200 with with valid payload", async () => {
        await request(server)
            .post(`/api/v1/compaigns`)
            .set("Authorization", `Bearer ${token}`)
            .send(compaign2)
            .expect(200)
    }, 30000)
})
