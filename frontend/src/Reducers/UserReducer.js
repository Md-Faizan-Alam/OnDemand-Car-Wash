export const UserReducer = (user = '', action) => {
    switch (action.type) {
        case 'VALIDATE_USER':
            return user;
        default:
            return user;
    }
}