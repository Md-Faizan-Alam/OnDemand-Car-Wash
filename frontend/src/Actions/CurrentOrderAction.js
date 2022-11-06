export const insertAddOnId = (addOnId) => {
    return (dispatch) => {
        dispatch({
            type: 'INSERT_ADD_ON',
            payload: addOnId,
        });
    };
};

export const removeAddOnId = (addOnId) => {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_ADD_ON',
            payload: addOnId,
        });
    };
};

export const setOrderLocation = (location) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_LOCATION',
            payload: location,
        });
    };
};

export const setBookingTime = () => {
    return (dispatch) => {
        dispatch({
            type: 'SET_BOOKING_TIME',
        });
    };
};

export const cancelOrder = () => {
    return (dispatch) => {
        dispatch({
            type: 'CANCEL_ORDER',
        });
    };
};
