const setUser = (user) =>{
    return (dispatch) =>{
        dispatch({
            type: 'SET_USER',
            payload: user
        });
    };
}

export default setUser;