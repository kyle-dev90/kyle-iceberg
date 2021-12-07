export interface ILogin {
    email: string
    password: string
}

export interface IRegister {
    email: string
    first_name: string
    last_name: string
    password: string
}

export interface IUser {
    id: string
    email: string
}

export interface IDecoded {
    id: string
    email: string
    iat: number
    exp: number
}

export interface ICampaign {
    start: number
    end: number
    targetImpressions: number
}

export interface ICampaignUpdate {
    id: string
    startDate: number
    endDate: number
    targetImpressions: number
    deliveredImpressions: number
}

export interface IError {
    response: string
    message: string
}
