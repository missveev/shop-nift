import {createStore, applyMiddleware} from "redux";
import rootReducer from './root-reducer';
import {logger} from "redux-logger/src";
const middlewares =[logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;