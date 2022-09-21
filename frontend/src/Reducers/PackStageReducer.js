const PackStageReducer = (packStage = "view", action) =>{
    switch (action.type) {
        case 'SET_PACK_STAGE':
            return action.payload;
        default:
            return packStage;
    }
}

export default PackStageReducer;