import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { Environment } from "../config/environment"

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.sendStatus(401)
    }
    jwt.verify(token, Environment.getJwtSecret(), (error: any, decoded: any) => {
        if (error) {
            console.log(error)
            return res.sendStatus(401)
        }
        res.locals.jwt = decoded
        next()
    })
}

export default validateJwt
