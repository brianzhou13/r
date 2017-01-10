import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reducer from './reducers';

const middleware = applyMiddleware(logger(), /* thunk if needed */);

const store = createStore(reducer, middleware);


export default store;