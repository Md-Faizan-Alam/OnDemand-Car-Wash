import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import CarStageReducer from "../Reducers/CarStageReducer";
import ProfileStageReducer from "../Reducers/ProfileStageReducer";
import SignedReducer from "../Reducers/SignedReducer";
import UserReducer from "../Reducers/UserReducer";
import OrderStageReducer from "../Reducers/OrderStageReducer";

export default configureStore({
    reducer: {profileStage: ProfileStageReducer, user: UserReducer, signed: SignedReducer, carStage: CarStageReducer, orderStage: OrderStageReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(logger),
    devTools: [composeWithDevTools]
})