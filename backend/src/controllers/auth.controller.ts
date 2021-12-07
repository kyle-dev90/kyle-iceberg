import { Request, Response } from "express"
import { registerNewUser, loginUser, getUserById } from "../services/auth.service"

export const authRegisterHandler = async (req: Request, res: Response) => {
    const { email } = req.body

    const result = await registerNewUser(req.body)

    if (!result) {
        return res.status(500).json({ message: `Registration failed with email : ${email}` })
    }

    return res.status(200).json(result)
}

export const authLoginHandler = async (req: Request, res: Response) => {
    const result = await loginUser(req.body)

    if (!result) {
        return res.status(500).json({ message: `Login Failed, incorrect password or username` })
    }

    return res.status(200).json(result)
}

export const authProifleHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await getUserById(id)

    if (!user) {
        return res.sendStatus(404)
    }

    return res.status(200).json(user)
}
