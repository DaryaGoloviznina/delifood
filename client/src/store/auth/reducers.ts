import { ACTypes } from '../types';

const initialState = {
  user: null
}
export const auth = (state = initialState, action) => {
  switch (action.type) {

    case ACTypes.SET_AUTH:
      const { _id, name } = action.payload;
      return {...state,  
        user: { _id, name }
      }

    case ACTypes.SIGNOUT:
      return {...state,  
        user: false
      }

    default:
      return state;
  }
}
