const SignedReducer = (signed = false, action) =>{
    switch (action.type) {
        case 'SET_SIGNED':
            return action.payload;
        default:
            return signed;
    }
}

export default SignedReducer;