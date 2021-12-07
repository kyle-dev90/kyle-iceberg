import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authJwtReducer from "./slices/authJwt"
import campaignReducer from "./slices/campaign"

const rootPersistConfig = {
    key: "root",
    storage,
    keyPrefix: "redux-",
    whitelist: ["settings"]
}

const authPersistConfig = {
    key: "authJwt",
    storage,
    keyPrefix: "redux-",
    whitelist: ["isAuthenticated"]
}

const rootReducer = combineReducers({
    authJwt: persistReducer(authPersistConfig, authJwtReducer),
    campaign: campaignReducer
})

export { rootPersistConfig, rootReducer }
