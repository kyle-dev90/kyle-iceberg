import { Router } from "express"
import validateRequest from "../middleware/validateRequest"
import validateJwt from "../middleware/validateJwt"
import { authRegisterSchema, authLoginSchema } from "../schema/auth.schemas"
import {
    authRegisterHandler,
    authLoginHandler,
    authProifleHandler
} from "../controllers/auth.controller"
import { compaignAddSchema } from "../schema/compaign.schemas"
import {
    compaignListHandler,
    compaignDetailHandler,
    compaignAddHandler
} from "../controllers/compaign.controller"

const router = Router()

router.post("/api/v1/register", validateRequest(authRegisterSchema), authRegisterHandler)
router.post("/api/v1/login", validateRequest(authLoginSchema), authLoginHandler)
router.get("/api/v1/profile/:id", validateJwt, authProifleHandler)

router.get("/api/v1/compaigns", validateJwt, compaignListHandler)
router.get("/api/v1/compaigns/:id", validateJwt, compaignDetailHandler)
router.post(
    "/api/v1/compaigns",
    validateJwt,
    validateRequest(compaignAddSchema),
    compaignAddHandler
)

export default router
