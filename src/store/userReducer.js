export function userReducer(state=null,action){
    switch(action.type){
        case 'LOGIN':
            return '555login'
        case 'LOGOUT':
            return 'logout555'
        default:
            return state;
    }
}