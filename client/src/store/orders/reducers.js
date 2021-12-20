import { ACTypes } from '../types';

const initialState = {
  orders: []
}
export const orders = (state = initialState, action) => {

  switch (action.type) {

    case ACTypes.SET_ACTIVE_ORDERS:
      return { ...state, orders: action.payload.activeOrders }

    case ACTypes.DELETE_ORDER:
      let newArr = state.orders.filter((el) => el.id !== action.payload.id);
      return { ...state, orders: newArr }
    
    case ACTypes.DELETE_ALL_ORDERS:
      return { ...state, orders: [] }

    default:
      return state;
  }
}
