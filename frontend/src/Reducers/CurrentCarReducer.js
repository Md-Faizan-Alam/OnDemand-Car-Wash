import Fallback from '../Constants/Fallback';

const CurrentCarReducer = (currentCar = Fallback.fallbackCar, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CAR':
            return action.payload;
        default:
            return currentCar;
    }
};

export default CurrentCarReducer;
