const fallbackUser = {
    userId: null,
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    password: null,
    carIds: [],
    dateOfBirth: null,
    gender: null,
    role: null
}

const UserReducer = (user = fallbackUser, action) =>{
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