import { createSlice } from "@reduxjs/toolkit"
import { ICampaign, ICampaignUpdate } from "../../interfaces"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

const initialState = {
    isLoading: false,
    error: false,
    campaigns: [],
    campaign: {} as ICampaignUpdate
}

const slice = createSlice({
    name: "campaign",
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true
        },

        endLoading(state) {
            state.isLoading = false
        },

        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false
            state.error = action.payload
        },

        // GET campaigns Success
        getCampaignsSuccess(state, action) {
            state.isLoading = false
            state.campaigns = action.payload.campaigns
        },

        getCampaignSuccess(state, action) {
            state.isLoading = false
            state.campaign = action.payload.campaign
        },

        initialCampaign(state) {
            state.campaign = {} as ICampaignUpdate
        }
    }
})

// Reducer
export default slice.reducer

// ----------------------------------------------------------------------

export function getCampaigns() {
    return async (dispatch: any) => {
        try {
            dispatch(slice.actions.startLoading())
            const token = localStorage.getItem("jwtToken")
            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}/compaigns`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.compaigns) {
                let data = await JSON.parse(res.data.compaigns)
                data = data.sort((a: ICampaignUpdate, b: ICampaignUpdate) =>
                    a.startDate < b.startDate ? 1 : b.startDate < a.startDate ? -1 : 0
                )
                dispatch(
                    slice.actions.getCampaignsSuccess({
                        campaigns: data
                    })
                )
            }
        } catch (error) {
            dispatch(slice.actions.hasError((error as Error).message))
        }
    }
}

export function getCampaign(id: string) {
    return async (dispatch: any) => {
        try {
            dispatch(slice.actions.startLoading())
            dispatch(slice.actions.initialCampaign())
            const token = localStorage.getItem("jwtToken")
            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}/compaigns/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.compaigns) {
                const data = await JSON.parse(res.data.compaigns)
                dispatch(
                    slice.actions.getCampaignSuccess({
                        campaign: data
                    })
                )
            }
        } catch (error) {
            dispatch(slice.actions.hasError((error as Error).message))
        }
    }
}

export function createCampaign(campaignArgs: ICampaign) {
    return async (dispatch: any) => {
        try {
            dispatch(slice.actions.startLoading())
            const id = uuidv4()
            const data = {
                id: id,
                startDate: campaignArgs.start,
                endDate: campaignArgs.end,
                targetImpressions: campaignArgs.targetImpressions
            }

            const token = localStorage.getItem("jwtToken")
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/compaigns`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: data
            })
            dispatch(slice.actions.endLoading())
            return true
        } catch (error) {
            throw error
        }
    }
}
