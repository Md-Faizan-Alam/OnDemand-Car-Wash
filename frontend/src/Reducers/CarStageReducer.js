const CarStageReducer = (carStage = "view", action) =>{
    switch (action.type) {
        case 'SET_CAR_STAGE':
            return action.payload;
        default:
            return carStage;
    }
}

export default CarStageReducer;