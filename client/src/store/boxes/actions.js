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
export const getFilteredBoxesThunk = ({option, value}) => async (dispatch) => {
  switch (option) {
    case 'cuisine':
      let request = await fetch(`/boxes/byCuisine`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: value,
        }),
      })
      const boxesByCuisine = await request.json();
      console.log('cuisine box=>>', boxesByCuisine);
      break;
    
    case 'price':
      break;
    
    case 'time':
      break;
  }
}


