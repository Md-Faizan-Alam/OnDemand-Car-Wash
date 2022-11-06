export const setCurrentCar = (car) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_CURRENT_CAR',
            payload: car,
        });
    };
};
