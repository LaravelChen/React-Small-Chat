/**
 * Created by LaravelChen on 2018/1/21.
 */
import types from  '../types/Types';
function cardReducer(state = {isLogin: false}, action) {
    switch (action.type) {
        case types.IS_LOGIN:
            return {
                ...state,
                isLogin: action.isLogin
            }
        default:
            return state
    }
}

export default cardReducer;