export const setModalState = (modalState) => {
    return (dispatch) => {
        dispatch({
            type: "SET_MODAL_STATE",
            payload: modalState,
        });
    };
};
