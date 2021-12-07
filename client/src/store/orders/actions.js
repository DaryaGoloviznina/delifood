import { ACTypes } from "../types";

export const setActiveOrdersAC = (arr) => ({ type: ACTypes.SET_ACTIVE_ORDERS, payload: { activeOrders: arr } });
export const deleteOrderAC = (id) => ({ type: ACTypes.DELETE_ORDER, payload: { id } });
export const deleteAllOrdersAC = () => ({ type: ACTypes.DELETE_ALL_ORDERS });

export const getOrders = (params) => async (dispatch) => {
  try {
    let request = await fetch(`/crm/orders/${params}`); 
    let response = await request.json();
    dispatch(setActiveOrdersAC(response))
  } catch (err) {
    console.error("Err", err);
  } 
};

export const issueOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderAC(id))
    await fetch(`/crm/order/pickedup`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id
      }),
    });
  } catch (err) {
    console.error("Err", err);
  } 
};

export const delOrder = (params, id) => async (dispatch) => {
  try {
    dispatch(deleteOrderAC(id))
    await fetch(`/crm/order/delete/${params}`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id
      }),
    });
  } catch (err) {
    console.error("Err", err);
  } 
};

export const deleteAllOrders = (arr) => async (dispatch) => {
  try {
    await fetch(`/crm/all/delete`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        arrId: arr, model: 'Order'
      }),
    });

    dispatch(deleteAllOrdersAC())
  } catch (err) {
    console.error("Err", err);
  } 
};
 