import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { UserReducer } from "../Reducers/UserReducer";

export default configureStore({
    reducer: {user: UserReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(logger),
    devTools: [composeWithDevTools]
})