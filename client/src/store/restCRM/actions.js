import { ACTypes } from "../types";

export const setActiveBoxesAC = (arr) => ({ type: ACTypes.SET_ACTIVE_BOXES, payload: { activeBoxes: arr } });
export const addNewBoxesAC = (obj) => ({ type: ACTypes.ADD_NEW_BOX, payload: { newBox: obj } });
export const editBoxAC = (id, obj) => ({ type: ACTypes.EDIT_BOX, payload: { id, box: obj } });
export const deleteBoxAC = (id) => ({ type: ACTypes.DELETE_BOX, payload: { id } });
