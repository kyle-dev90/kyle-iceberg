import { Request, Response } from "express"
import {
    fetchAllComapigns,
    fetchSingleCompaign,
    addNewCompaign
} from "../services/compaign.service"

export const compaignListHandler = async (req: Request, res: Response) => {
    const result = await fetchAllComapigns()

    if (!result) {
        return res.status(500).json({ message: "fetching all compaigns failed" })
    }

    return res.status(200).json(result)
}

export const compaignDetailHandler = async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await fetchSingleCompaign(id)

    if (!result) {
        return res.status(500).json({ message: "fetching compaign failed" })
    }

    return res.status(200).json(result)
}

export const compaignAddHandler = async (req: Request, res: Response) => {
    const result = await addNewCompaign(req.body)

    if (!result) {
        return res.status(500).json({ message: "add new compaign failed" })
    }

    return res.status(200).json(result)
}
