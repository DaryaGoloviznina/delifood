import { ACTypes } from "../types";

export const setActiveBoxesAC = (arr) => ({ type: ACTypes.SET_ACTIVE_BOXES, payload: { activeBoxes: arr } });
export const addNewBoxesAC = (obj) => ({ type: ACTypes.ADD_NEW_BOX, payload: { newBox: obj } });
export const editBoxAC = (id, obj) => ({ type: ACTypes.EDIT_BOX, payload: { id, box: obj } });
export const deleteBoxAC = (id) => ({ type: ACTypes.DELETE_BOX, payload: { id } });
export const deleteAllBoxAC = () => ({ type: ACTypes.DELETE_ALL_BOXES });

export const getBoxes = (params, id) => async (dispatch) => {
  try {
    let request = await fetch(`/crm/boxes/${params}`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id}),
    }); 
    let response = await request.json();
    dispatch(setActiveBoxesAC(response))
  } catch (err) {
    console.error("Err", err);
  } 
};

export const createNewBox = (obj, params) => async (dispatch) => {
  try {
    let request = await fetch(`/crm/box/new`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    let response = await request.json();
    if (params === 'active') dispatch(addNewBoxesAC(response))
  } catch (err) {
    console.error("Err", err);
  } 
};

export const editBoxes = (obj, id) => async (dispatch) => {
  try {
    let request = await fetch(`/crm/box/edit`, { 
      method: 'POST', // patch
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(obj),
    });
    let response = await request.json();
    dispatch(editBoxAC(id, response))
  } catch (err) {
    console.error("Err", err);
  } 
};

export const delBox = (params, id, func) => async (dispatch) => {
  try {
    let request = await fetch(`/crm/box/delete/${params}`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
      }),
    });
    let response = await request.json()

    if (response === 'successfully') {
      dispatch(deleteBoxAC(id))
    } else {
      func(true)
    }
  } catch (err) {
    console.error("Err", err);
  } 
};

export const deleteAllBoxes = (arr) => async (dispatch) => {
  try {
    await fetch(`/crm/all/delete`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        arrId: arr, model: 'Box'
      }),
    });

    dispatch(deleteAllBoxAC())
    
  } catch (err) {
    console.error("Err", err);
  } 
};
