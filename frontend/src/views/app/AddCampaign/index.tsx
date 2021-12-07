import { useCallback, useState, ReactElement } from "react"
import TextField from "@material-ui/core/TextField"
import { useSelector } from "react-redux"
import { Row, Col, Container, Spinner } from "react-bootstrap"
import Button from "@material-ui/core/Button"
import Notification from "../../../components/Notification"
import useCampaign from "../../../hooks/useCampaign"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import { IRootState } from "../../../redux/store"

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6, 6, 6)
    },
    actionBtnGruop: {
        display: "flex",
        justifyContent: "flex-end"
    },
    inputTitle: {
        marginBottom: "0px",
        marginTop: "20px"
    }
}))

function AddCampaign(): ReactElement {
    const history = useHistory()
    const classes = useStyles()
    const { isLoading } = useSelector((state: IRootState) => state.campaign)

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [targetImpressions, setTargetImpressions] = useState("")

    const { createCampaign } = useCampaign()

    const initializeState = useCallback(() => {
        setStartDate("")
        setEndDate("")
        setTargetImpressions("")
    }, [])

    const handleChange = useCallback(
        (event) => {
            const { name, value } = event.currentTarget

            if (name === "start") {
                setStartDate(value)
            } else if (name === "end") {
                setEndDate(value)
            } else if (name === "target") {
                setTargetImpressions(value)
            }
        },
        [setStartDate, setEndDate, setTargetImpressions]
    )

    const handleSaveNewCampaign = useCallback(async () => {
        try {
            if (startDate && endDate && targetImpressions) {
                const dateStart = new Date(startDate).getTime()
                const dateEnd = new Date(endDate).getTime()
                await createCampaign({
                    start: dateStart,
                    end: dateEnd,
                    targetImpressions: parseInt(targetImpressions)
                })
                Notification("success", "Save new Campaign success!")
                history.push("/home")
                initializeState()
            } else {
                Notification("error", "All input fields are required!")
            }
        } catch (err) {
            Notification("warning", (err as Error).message)
        }
    }, [startDate, endDate, targetImpressions, createCampaign, history, initializeState])

    const handleCancelCampaign = useCallback(() => {
        setStartDate("")
        setEndDate("")
        setTargetImpressions("")
        history.push("/home")
    }, [history])

    return (
        <Container className={classes.content}>
            <h3 id="form-dialog-title">New Campaign</h3>
            <Row>
                <Col>
                    <p className={classes.inputTitle}>Start Date</p>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        type="date"
                        name="start"
                        fullWidth
                        value={startDate}
                        onChange={handleChange}
                    />
                </Col>
                <Col>
                    <p className={classes.inputTitle}>End Date</p>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="content"
                        type="date"
                        name="end"
                        fullWidth
                        value={endDate}
                        onChange={handleChange}
                    />
                </Col>
                <Col>
                    <p className={classes.inputTitle}>Target Impressions</p>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="content"
                        type="number"
                        name="target"
                        fullWidth
                        value={targetImpressions}
                        onChange={handleChange}
                    />
                </Col>
            </Row>
            <br />
            <div className={classes.actionBtnGruop}>
                <Button
                    onClick={handleCancelCampaign}
                    className="mx-2"
                    variant="contained"
                    color="primary"
                >
                    Cancel
                </Button>
                <Button onClick={handleSaveNewCampaign} variant="contained" color="primary">
                    {isLoading ? <Spinner animation="border" size="sm" /> : "Save"}
                </Button>
            </div>
        </Container>
    )
}

export default AddCampaign
