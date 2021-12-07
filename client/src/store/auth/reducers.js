import { ACTypes } from '../types';

const initialState = {
  user: null,
}
export const auth = (state = initialState, action) => {
  switch (action.type) {

    case ACTypes.SET_AUTH_USER:
      return {...state,  
        user: action.payload
      }
    
    case ACTypes.SET_AUTH_BUSINESS:
      return {...state,  
        business: action.payload
      } 

    case ACTypes.SIGNOUT:
      return {...state,  
        user: null,
        business: null
      }

    case ACTypes.UPDATE_PROFILE:
      return action.payload.address 
      ? 
        {...state, 
          business: {...state.business, ...action.payload}
        }
      : 
        {...state, 
          user: {...state.user, ...action.payload}
        }

    default:
      return state;
  }
}
