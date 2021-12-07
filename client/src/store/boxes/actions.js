import { formateDate } from "../../lib/formateTimeFunctions";
import { ACTypes } from "../types";

export const setAllBoxes = (boxes) => ({type: ACTypes.SET_ALL_BOXES, payload: {boxes}});
export const setAllCuisines = (cuisines) => ({type: ACTypes.SET_ALL_CUISINE, payload: {cuisines}});

//-------------fetching all active boxes
export const getAllBoxesThunk = (arg) => async (dispatch) => {
  let allBoxes = await (await fetch(`/boxes/allBoxes`)).json();
  
  if (allBoxes) dispatch(setAllBoxes(allBoxes));
}

//--------------fetching all cuisines
export const getAllCuisinesThunk = (arg) => async (dispatch) => {
  let allCuisines = await (await fetch(`/boxes/allCuisines`)).json();
  
  if (allCuisines) dispatch(setAllCuisines(allCuisines));
}

//---------------fetching filtered boxes based on user's choice
export const getFilteredBoxesThunk = (data) => async (dispatch) => {
  console.log('dataaa time=>', data);

  //converting string time back to object for DB filtration
  let DBDate = null;
  if ( data.time !== 'anyTime') {
    DBDate = formateDate(data.time);
  }

  //fetching all boxes if no filter set
  if (
    data.cuisine === 'Any Cuisine' && 
    data.price === 'anyPrice' && 
    data.time === 'anyTime') {
    
    dispatch(getAllBoxesThunk(42));
  } else {
    //fetching filtered boxes based on user's choices
    let request = await fetch(`/boxes/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: data.cuisine,
        price: data.price,
        time: DBDate ? DBDate : data.time,
      }),
    })
  let filteredBoxes = await request.json();

  dispatch(setAllBoxes(filteredBoxes));
  }
}


