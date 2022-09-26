const RefreshReducer = (refresh = false, action) =>{
    switch (action.type) {
        case 'REFRESH':
            return !refresh;
        default:
            return refresh;
    }
}

export default RefreshReducer;