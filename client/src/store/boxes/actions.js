import { formateDate } from "../../lib/formateTimeFunctions";
import { ACTypes } from "../types";

export const setAllBoxes = (boxes) => ({type: ACTypes.SET_ALL_BOXES, payload: {boxes}});
export const setAllCuisines = (cuisines) => ({type: ACTypes.SET_ALL_CUISINE, payload: {cuisines}});

//-------------fetching all active boxes
export const getAllBoxesThunk = (userLocation) => async (dispatch) => {
  let allBoxes = await (await fetch(`/boxes/allBoxes`)).json();
  
  if (userLocation?.country_code) {
    allBoxes = await filterBoxByLocation(allBoxes, userLocation)
  }
  
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
    
    dispatch(getAllBoxesThunk());
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

export const getSearchedBoxesThunk = (query) => async (dispatch) => {
  const searchedBoxes = await (await fetch('/boxes/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({query}),
    }
  )).json();

  dispatch(setAllBoxes(searchedBoxes));
}

export const filterBoxByLocation = async (boxes, userLocation) => {

  const newBoxes = [];

  for (let box of boxes) {
    let boxGeoData = await (
      await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&lang=en_US&apikey=4321dfba-081c-44a9-8f75-0b7384c8952d&geocode=${box.store_lon}, ${box.store_lat}`)
    ).json();

    const boxCountryCode = boxGeoData.response
    .GeoObjectCollection.featureMember[0]
    .GeoObject.metaDataProperty.GeocoderMetaData
    .Address.country_code;
    
    if (boxCountryCode === userLocation?.country_code) newBoxes.push(box);
  }

  return newBoxes
}

