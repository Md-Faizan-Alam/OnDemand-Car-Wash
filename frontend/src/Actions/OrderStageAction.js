const setOrderStage = (stage) =>{
    
    return (dispatch) =>{
        dispatch({
            type: 'SET_ORDER_STAGE',
            payload: stage
        });
    };
}

export default setOrderStage;