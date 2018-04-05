/**
 * Created by LaravelChen on 2018/1/21.
 */
import types from  '../types/Types';
function webSocketReducer(state = {webMessage: ""}, action) {
    switch (action.type) {
        case types.WEB_MESSAGE:
            return {
                ...state,
                webMessage: action.webMessage
            }
        default:
            return state
    }
}

export default webSocketReducer;