import { ACTypes } from '../types';

const initialState = {
  user: null,
  location: null,
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
      }
    
    case ACTypes.UPDATE_PROFILE:
      return {...state, 
          user: {...state.user, ...action.payload}
        }
      
      case ACTypes.SET_USER_LOCATION:
        return {...state,
          location: action.payload,
        }

    default:
      return state;
  }
}
