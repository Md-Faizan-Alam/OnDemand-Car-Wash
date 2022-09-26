export const refreshPage = () =>{
    
    return (dispatch) =>{
        dispatch({
            type: 'REFRESH',
        });
    };
}