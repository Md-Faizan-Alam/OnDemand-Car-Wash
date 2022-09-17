const OrderStageReducer = (orderStage = "view", action) =>{
    switch (action.type) {
        case 'SET_ORDER_STAGE':
            return action.payload;
        default:
            return orderStage;
    }
}

export default OrderStageReducer;