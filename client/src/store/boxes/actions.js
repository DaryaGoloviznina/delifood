import { formateDate } from "../../lib/formateTimeFunctions";
import { ACTypes } from "../types";

export const setAllBoxes = (boxes) => ({type: ACTypes.SET_ALL_BOXES, payload: {boxes}});
export const setAllCuisines = (cuisines) => ({type: ACTypes.SET_ALL_CUISINE, payload: {cuisines}});
export const updateBoxData = (newBoxData) => ({type: ACTypes.UPDATE_BOX_DATA, payload: newBoxData})

//-------------fetching all active boxes
export const getAllBoxesThunk = (userLocation) => async (dispatch) => {
  let allBoxes = await (await fetch(`/boxes/allBoxes`)).json();
  
  if (userLocation?.country_code) {
    allBoxes = filterBoxByLocation(allBoxes, userLocation);
  }
  
  if (allBoxes) dispatch(setAllBoxes(allBoxes));
}

//--------------fetching all cuisines
export const getAllCuisinesThunk = () => async (dispatch) => {
  let allCuisines = await (await fetch(`/boxes/allCuisines`)).json();
  
  if (allCuisines) dispatch(setAllCuisines(allCuisines));
}

//---------------fetching filtered boxes based on user's choice
export const getFilteredBoxesThunk = (data, userLocation) => async (dispatch) => {

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
    
    dispatch(getAllBoxesThunk(userLocation));
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
  
  if (userLocation?.country_code) {
    filteredBoxes = filterBoxByLocation(filteredBoxes, userLocation)
  }
  dispatch(setAllBoxes(filteredBoxes));
  }
}

export const getSearchedBoxesThunk = (query) => async (dispatch) => {
  const searchedBoxes = await (await fetch('/boxes/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({query}),
    }
  )).json();

  dispatch(setAllBoxes(searchedBoxes));
}

export const filterBoxByLocation = (boxes, userLocation) => {

  return boxes.filter((el) => 
    el.country_code === userLocation?.country_code);
}

