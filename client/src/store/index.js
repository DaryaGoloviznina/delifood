import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { auth } from "./auth/reducers";
import { restCRM } from "./restCRM/reducers"
import thunk from "redux-thunk"

const composeEnhancers = composeWithDevTools(applyMiddleware(thunk)); 
const reducers = combineReducers({
  auth,
  restCRM
});
export const store = createStore(reducers, composeEnhancers);
