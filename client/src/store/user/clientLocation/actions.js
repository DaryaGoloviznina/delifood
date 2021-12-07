import { ACTypes } from "../../types";

export const setUserLocation = (locationData) => ({type: ACTypes.SET_USER_LOCATION, payload: locationData});