export interface IUser {
    first_name: string
    last_name: string
    email: string
    password: string
}

export interface ILoginUser {
    email: string
    password: string
}

export interface ICampaign {
    id: string
    startDate: number
    endDate: number
    targetImpressions: number
    deliveredImpressions: number
}

export interface IAddCompaignResposne {
    id: string
}
