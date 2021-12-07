import { object, string, number } from "yup"

export const compaignAddSchema = object({
    body: object({
        id: string().required("ID is required."),
        startDate: number().required("ID is required."),
        endDate: number().required("ID is required."),
        targetImpressions: number().required("ID is required.")
    })
})
