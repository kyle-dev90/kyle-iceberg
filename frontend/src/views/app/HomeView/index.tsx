import React, { useState, useMemo, useEffect, useCallback, ReactElement } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "@material-ui/core/Button"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import InfinitScroll from "react-infinite-scroll-component"
import Grid from "@material-ui/core/Grid"
import { Spinner } from "react-bootstrap"
import CampaignCard from "../../../components/CampaignCard"
import { getCampaigns } from "../../../redux/slices/campaign"
import { IRootState } from "../../../redux/store"
import { ICampaignUpdate } from "../../../interfaces"

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2)
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6, 0, 0)
    },
    addNewButton: {
        backgroundColor: "#3f51b5",
        color: "#ffffff",
        height: "40px"
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8)
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        flexGrow: 1
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
    },
    actionTopView: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
}))

function HomeView(): ReactElement {
    const history = useHistory()
    const classes = useStyles()
    const dispatch = useDispatch()
    const { campaigns } = useSelector((state: IRootState) => state.campaign)

    const [limit, setLimit] = useState(16)
    const [page, setPage] = useState(1)
    const [isFetch, setIsFetch] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [campaignList, setCampaignList] = useState([])

    const getCampaignDatas = useCallback(() => {
        if (isFetch) {
            dispatch(getCampaigns())
            setIsFetch(false)
        }
    }, [dispatch, isFetch])

    const getinitialCampaignList = useCallback(() => {
        const data = campaigns.slice((page - 1) * limit, page * limit)
        setCampaignList(campaignList.concat(data))
        if (campaignList.length >= campaigns.length) {
            setHasMore(false)
        } else {
            setHasMore(true)
        }
    }, [setCampaignList, campaignList, campaigns, limit, page, setHasMore])

    useEffect(() => {
        // Get registerd campaign datas
        setLimit(16)
        getCampaignDatas()
        if (campaigns.length > 0) {
            if (campaignList.length < page * limit) {
                getinitialCampaignList()
            }
        }
    }, [page, campaigns, campaignList.length, limit, getCampaignDatas, getinitialCampaignList])

    const handleNextPage = useCallback(() => {
        setTimeout(() => {
            setPage(page + 1)
            setIsFetch(true)
        }, 1000)
    }, [page, setPage])

    const showCampaignCards = useMemo(() => {
        return (
            campaignList.length > 0 &&
            campaignList.map((campaign: ICampaignUpdate, index: number) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <CampaignCard
                        id={campaign.id}
                        start={campaign.startDate}
                        end={campaign.endDate}
                        target={campaign.targetImpressions}
                        delivered={campaign.deliveredImpressions}
                        index={index}
                    />
                </Grid>
            ))
        )
    }, [campaignList])

    return (
        <main>
            <div className={classes.heroContent}>
                <Container className={classes.actionTopView}>
                    <Button
                        className={classes.addNewButton}
                        variant="contained"
                        color="primary"
                        onClick={() => history.push(`/add-campaign`)}
                    >
                        Add New +
                    </Button>
                </Container>
                <Container className={classes.cardGrid}>
                    <InfinitScroll
                        dataLength={campaignList.length}
                        next={handleNextPage}
                        hasMore={hasMore}
                        loader={
                            <div className="d-flex justify-content-center m-4">
                                <Spinner animation="border" />
                            </div>
                        }
                        style={{ overflow: "inherit" }}
                    >
                        <Grid container spacing={3}>
                            {showCampaignCards}
                        </Grid>
                    </InfinitScroll>
                </Container>
            </div>
        </main>
    )
}

export default HomeView
