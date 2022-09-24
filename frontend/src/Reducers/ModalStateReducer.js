import Fallback from "../Constants/Fallback";

const ModalStateReducer = (modalState = Fallback.idleModal, action) =>{
    switch (action.type) {
        case 'SET_MODAL_STATE':
            return action.payload;
        default:
            return modalState;
    }
}

export default ModalStateReducer;