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
    
    case ACTypes.UPDATE_BOX_DATA:
      return {...state,
        boxes: state.boxes.map((el) => {
          if (el.id === action.payload.id) el.count_reserved += action.payload.count_reserved;
          return el
        })
      }

    default:
      return state;
  }
}
