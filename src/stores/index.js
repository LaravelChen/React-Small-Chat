/**
 * Created by LaravelChen on 2018/1/22.
 */
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/index'


const store = createStore(
    combineReducers(rootReducer),
    applyMiddleware(thunkMiddleware)
);
export default store