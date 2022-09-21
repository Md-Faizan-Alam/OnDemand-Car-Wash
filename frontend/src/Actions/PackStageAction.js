export const setPackStage = (stage) =>{
    
    return (dispatch) =>{
        dispatch({
            type: 'SET_PACK_STAGE',
            payload: stage
        });
    };
}