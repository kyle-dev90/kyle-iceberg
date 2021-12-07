import * as bcrypt from "bcrypt"
import * as jsonwebtoken from "jsonwebtoken"
import { IUser, ILoginUser } from "../common/types"
import User from "../models/userModel"
import { Environment } from "../config/environment"

export async function registerNewUser(userData: IUser) {
    try {
        const { email, password, first_name, last_name } = userData

        // Check email already exist
        const user = await User.findOne({ email })

        if (user) {
            throw new Error("Email already with exisiting provided one")
        }

        const new_user = await User.create({
            first_name,
            last_name,
            email,
            password: await bcrypt.hash(password, 10)
        })

        // Create json webtoken
        const token: string = jsonwebtoken.sign(
            { id: new_user._id, email: new_user.email },
            Environment.getJwtSecret(),
            { expiresIn: "1y" }
        )

        return {
            success: true,
            token: token,
            id: new_user._id
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function loginUser(userData: ILoginUser) {
    try {
        const { email, password } = userData

        // Check email already exist
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error("No user exist with this email")
        }

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
            throw new Error("Incorrect email or password")
        }

        // Create json webtoken
        const token: string = jsonwebtoken.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1y" }
        )

        return {
            success: true,
            token: token,
            id: user._id
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getUserById(id: string) {
    try {
        return await User.findById(id)
    } catch (error) {
        console.log(error)
        return null
    }
}
