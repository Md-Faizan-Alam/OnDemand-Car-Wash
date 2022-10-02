import Fallback from "../Constants/Fallback";

const CurrentPackReducer = (currentPack = Fallback.emptyPack, action) => {
    switch (action.type) {
        case "SET_CURRENT_PACK":
            return action.payload;
        case "RESET_PACK":
            return Fallback.emptyPack;
        default:
            return currentPack;
    }
};

export default CurrentPackReducer;
