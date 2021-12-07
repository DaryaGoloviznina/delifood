import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { auth } from "./auth/reducers";
import { restCRM } from "./restCRM/reducers"
import { boxes } from "./boxes/reducers"
import { orders } from './orders/reducers';
import thunk from "redux-thunk"

const composeEnhancers = composeWithDevTools(applyMiddleware(thunk)); 
const reducers = combineReducers({
  auth,
  restCRM,
  orders,
  boxes
});
export const store = createStore(reducers, composeEnhancers);
