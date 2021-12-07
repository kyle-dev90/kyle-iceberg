import { AnySchema } from "yup"
import { Request, Response, NextFunction } from "express"

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body
        })
        return next()
    } catch (error) {
        console.log(error)
        return res.status(400).send((<Error>error).message)
    }
}

export default validate
