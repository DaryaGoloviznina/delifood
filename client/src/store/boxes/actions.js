import { ACTypes } from "../types";

export const setAllBoxes = (boxes) => ({type: ACTypes.SET_ALL_BOXES, payload: {boxes}});
export const setAllCuisines = (cuisines) => ({type: ACTypes.SET_ALL_CUISINE, payload: {cuisines}});

//-------------fetching all boxes
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
  console.log('dataaa=>', data);

  // if (
  //   data.cuisine === 'Any Cuisine' && 
  //   data.price === 'anyPrice' && 
  //   data.time === 'anyTime') {
  //   console.log('yessssss', 11111);
  //   dispatch(getAllBoxesThunk(42));
  // }

  // switch (data) {
  //   case {
  //     cuisine: 'Any Cuisine', 
  //     price: 'anyPrice', 
  //     time: 'anyTime'}:

  //     console.log('yessssss', 11111);
  //     dispatch(getAllBoxesThunk(42));
  //     break;
    
    //   let request = await fetch(`/boxes/byCuisine`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       type: value,
    //     }),
    //   })
    //   const boxesByCuisine = await request.json();
      
    //   dispatch(setAllBoxes(boxesByCuisine));
    //   break;
    
    // case 'price':
    //   break;
    
    // case 'time':
    //   break;
  // }
}


