const setSigned = (signed) =>{
    return (dispatch) =>{
        dispatch({
            type: 'SET_SIGNED',
            payload: signed
        });
    };
}

export default setSigned;