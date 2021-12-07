import { ACTypes } from '../types';

const initialState = {
  boxes: [],
  cuisines: []
}
export const boxes = (state = initialState, action) => {
  switch (action.type) {
    case ACTypes.SET_ALL_BOXES:
      return {...state,  
        boxes: action.payload.boxes
      }
    
    case ACTypes.SET_ALL_CUISINE:
      return {...state,  
        cuisines: action.payload.cuisines
      }

    default:
      return state;
  }
}
