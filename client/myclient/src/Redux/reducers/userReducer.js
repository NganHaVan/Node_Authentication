export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN':
            return action.payload
        case 'USER_PROFILE':
            return action.payload
        case 'USER_LOGOUT':
            return {}
        case 'USER_SIGNUP':
            return action.payload
        default:
            return state
    }
}