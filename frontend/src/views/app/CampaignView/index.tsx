import { useEffect, ReactElement, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory, useParams } from "react-router-dom"
import { IRootState } from "../../../redux/store"
import { getCampaign } from "../../../redux/slices/campaign"
import { ArrowBack } from "@material-ui/icons"
import { Spinner } from "react-bootstrap"

const useStyles = makeStyles((theme) => ({
    loadingDiv: {
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6, 6, 6)
    },
    actionBtnGruop: {
        display: "flex",
        justifyContent: "flex-end"
    },
    backBtn: {
        cursor: "pointer",
        marginRight: "20px",
        fontSize: "32px"
    }
}))

function CampaignView(): ReactElement {
    const history = useHistory()
    const classes = useStyles()
    const params = useParams()
    const dispatch = useDispatch()
    const { campaign, isLoading } = useSelector((state: IRootState) => state.campaign)

    useEffect(() => {
        dispatch(getCampaign((params as any).id))
    }, [dispatch, params])

    const content = useMemo(() => {
        return isLoading || !campaign.id ? (
            <div className={classes.loadingDiv}>
                <Spinner animation="border" />
            </div>
        ) : (
            <div className={classes.content}>
                <div className="d-flex align-items-center">
                    <ArrowBack className={classes.backBtn} onClick={() => history.push("/home")} />
                    <h2 className="m-0">Campaign Data</h2>
                </div>
                <hr />

                <h4>Start: {new Date(campaign.startDate).toLocaleDateString().toString()}</h4>
                <h4>End: {new Date(campaign.endDate).toLocaleDateString().toString()}</h4>
                <h4>Target Impressions: {campaign.targetImpressions}</h4>
                <h4>Delivered Impressions: {campaign.deliveredImpressions}</h4>
            </div>
        )
    }, [isLoading, campaign, classes.backBtn, classes.content, classes.loadingDiv, history])

    return <div>{content}</div>
}

export default CampaignView
