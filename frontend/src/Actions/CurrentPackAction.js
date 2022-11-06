export const setCurrentPack = (pack) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_CURRENT_PACK',
            payload: pack,
        });
    };
};

export const resetPack = () => {
    return (dispatch) => {
        dispatch({
            type: 'RESET_PACK',
        });
    };
};
