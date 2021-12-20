import { updateBoxData } from "../boxes/actions";
import { ACTypes } from "../types";

export const setActiveOrdersAC = (arr) => ({ type: ACTypes.SET_ACTIVE_ORDERS, payload: { activeOrders: arr } });
export const deleteOrderAC = (id) => ({ type: ACTypes.DELETE_ORDER, payload: { id } });
export const deleteAllOrdersAC = () => ({ type: ACTypes.DELETE_ALL_ORDERS });

export const addNewOrder = (orderData) => async (dispatch) => {
  const request = await fetch(`/client/order/new`, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (request.status === 201) {
    dispatch(updateBoxData({
      id: orderData.box_id,
      count_reserved: orderData.count_box,
    }))  
  }
}

export const getOrders = (params, id) => async (dispatch) => {
  try {
    let request = await fetch(`/crm/orders/${params}`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id
      }),
    }); 
    let response = await request.json();
    dispatch(setActiveOrdersAC(response))
  } catch (err) {
    console.error("Err", err);
  } 
};

export const getClientOrders = (params, user) => async (dispatch) => {
  try {
    let request = await fetch(`/client/orders/${params}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user?.id,
      }),
    });
    let response = await request.json();
    response = response.map((el)=>{
      if (new Date(el.box_end_date) > new Date() && el.picked_up === false) {
        el.status = 'Pending Pick Up';
        return el
      } else if (new Date(el.box_end_date) < new Date() && el.picked_up === false){
        el.status = 'Picked up';
        return el
      } else {
        el.status = 'Expired';
        return el
      }
    })
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

export const delClientOrder = (status, id) => async (dispatch) => {
  try {
    await fetch(`/client/order/del`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({status, id}),
    }); 
  
    dispatch(deleteOrderAC(id))

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
