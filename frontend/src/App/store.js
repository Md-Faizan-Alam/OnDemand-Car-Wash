import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import CarStageReducer from '../Reducers/CarStageReducer';
import ProfileStageReducer from '../Reducers/ProfileStageReducer';
import UserReducer from '../Reducers/UserReducer';
import OrderStageReducer from '../Reducers/OrderStageReducer';
import CurrentOrderReducer from '../Reducers/CurrentOrderReducer';
import PackStageReducer from '../Reducers/PackStageReducer';
import ModalStateReducer from '../Reducers/ModalStateReducer';
import RefreshReducer from '../Reducers/RefreshReducer';
import CurrentPackReducer from '../Reducers/CurrentPackReducer';
import CurrentCarReducer from '../Reducers/CurrentCarReducer';

export default configureStore({
    reducer: {
        profileStage: ProfileStageReducer,
        user: UserReducer,
        carStage: CarStageReducer,
        orderStage: OrderStageReducer,
        currentOrder: CurrentOrderReducer,
        packStage: PackStageReducer,
        modalState: ModalStateReducer,
        refresh: RefreshReducer,
        currentPack: CurrentPackReducer,
        currentCar: CurrentCarReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk).concat(logger),
    devTools: [composeWithDevTools],
});
