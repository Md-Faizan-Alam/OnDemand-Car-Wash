import Fallback from '../Constants/Fallback';

const CurrentOrderReducer = (currentOrder = Fallback.emptyOrder, action) => {
    switch (action.type) {
        case 'INSERT_ADD_ON':
            return {
                ...currentOrder,
                addOnIdList: {
                    stringList: [
                        ...currentOrder.addOnIdList.stringList,
                        action.payload,
                    ],
                },
            };
        case 'REMOVE_ADD_ON':
            let modifiedList = [...currentOrder.addOnIdList.stringList];
            modifiedList = modifiedList.filter(
                (element) => element !== action.payload
            );
            return {
                ...currentOrder,
                addOnIdList: {
                    stringList: [...modifiedList],
                },
            };
        case 'SET_LOCATION':
            return {
                ...currentOrder,
                location: action.payload,
            };
        case 'SET_BOOOKING_TIME':
            return {
                ...currentOrder,
                bookingTime: Date.now(),
            };
        case 'CANCEL_ORDER':
            return Fallback.emptyOrder;
        default:
            return currentOrder;
    }
};

export default CurrentOrderReducer;
