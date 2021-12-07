import faker from "faker"
import request from "supertest"
import * as http from "http"
import { createServer } from "../../common/testServer"

let server: http.Server

beforeAll(async () => {
    server = (await createServer()).listen()
})

afterAll(async () => {
    server.close()
})

const profile = {
    email: faker.internet.email(),
    password: faker.internet.password(15, false, /^[A-Za-z]*$/, "164"),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName()
}

describe("register", () => {
    it("should return 200 with valid userinfo", async () => {
        await request(server).post(`/api/v1/register`).send(profile).expect(200)
    }, 30000)
})

describe("login", () => {
    it("should return 200 with valid login info", async () => {
        await request(server).post(`/api/v1/login`).send(profile).expect(200)
    }, 30000)

    it("should return 500 with invalid login info", async () => {
        await request(server)
            .post(`/api/v1/login`)
            .send({ email: profile.email, password: faker.internet.password(15) })
            .expect(500)
    }, 30000)
})
