const setCarStage = (stage) =>{
    
    return (dispatch) =>{
        dispatch({
            type: 'SET_CAR_STAGE',
            payload: stage
        });
    };
}

export default setCarStage;