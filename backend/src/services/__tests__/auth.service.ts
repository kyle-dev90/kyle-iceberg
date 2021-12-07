import faker from "faker"
import { registerNewUser, loginUser } from "../auth.service"
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
    it("should return true with valid user info", async () => {
        const newUser = await registerNewUser(profile)

        expect(newUser).not.toBeNull()
    }, 30000)
})

describe("login", () => {
    it("should return null when email is empty", async () => {
        const user = await loginUser({ email: "", password: profile.password })

        expect(user).toBeNull()
    }, 30000)

    it("should return null with invalid email", async () => {
        const user = await loginUser({ email: "test", password: profile.password })

        expect(user).toBeNull()
    }, 30000)
})
