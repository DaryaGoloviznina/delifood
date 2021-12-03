import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { auth } from "./auth/reducers";

const composeEnhancers = composeWithDevTools(); 
const reducers = combineReducers({
  auth, // по этим ключам, потом обращаемся в подредьюсеры

});
export const store = createStore(reducers, composeEnhancers);
