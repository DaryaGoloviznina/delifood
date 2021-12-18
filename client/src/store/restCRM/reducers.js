import { ACTypes } from '../types';
import { addDateAndTimeToBox } from '../../lib/formateTimeFunctions';

const initialState = {
  boxes: []
}
export const restCRM = (state = initialState, action) => {

  switch (action.type) {

    case ACTypes.SET_ACTIVE_BOXES:
      let extendedInfoBoxes = action.payload.activeBoxes.map((el) => {
        return addDateAndTimeToBox(el)
      })

      return { ...state, boxes: extendedInfoBoxes }
    
    case ACTypes.ADD_NEW_BOX:
      let newBox = addDateAndTimeToBox(action.payload.newBox);
      let newArrBoxes = [newBox, ...state.boxes]

      return { ...state, boxes: newArrBoxes }
  
    case ACTypes.EDIT_BOX:
      let newArrOfBoxes = state.boxes.map((el) =>{
        if (el.id === action.payload.id) {
          el = addDateAndTimeToBox(action.payload.box)
        }
        return el
      })
  
      return { ...state, boxes: newArrOfBoxes }
      
    case ACTypes.DELETE_BOX:
      let newArr = state.boxes.filter((el) => el.id !== action.payload.id);
      return { ...state, boxes: newArr }

    case ACTypes.DELETE_ALL_BOXES:
      return { ...state, boxes: [] }

    default:
      return state;
  }
}
