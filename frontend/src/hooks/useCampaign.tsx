import { useDispatch } from "react-redux"
import { createCampaign } from "../redux/slices/campaign"
import { ICampaign } from "../interfaces"

export default function useCampaign() {
    const dispatch = useDispatch()

    return {
        createCampaign: (campaignArgs: ICampaign) =>
            dispatch(
                createCampaign({
                    start: campaignArgs.start,
                    end: campaignArgs.end,
                    targetImpressions: campaignArgs.targetImpressions
                })
            )
    }
}
