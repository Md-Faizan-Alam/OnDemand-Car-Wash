import Fallback from "../Constants/Fallback";

const UserReducer = (user = Fallback.fallbackUser, action) =>{
    switch (action.type) {
        case 'SET_USER':
            if(action.payload===undefined || action.payload===null){
                return user;
            }else{
                return action.payload;
            }
            
        default:
            return user;
    }
}

export default UserReducer;