import { ACTypes } from "../../types";

export const setAuthUser = (profileData) => ({type: ACTypes.SET_AUTH_USER, payload: profileData});
export const noUser = () => ({type: ACTypes.SIGNOUT});

//------------fetching server to register the user
export const registerUserThunk = (data) => async (dispatch) => {
  let request = await fetch(`/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data?.phone,
      address: data?.address,
      cuisine: data?.cuisine,
      lon: data?.lon,
      lat: data?.lat,
      country_code: data?.countryCode,
    }),
  });
  
  if (request.status === 401) alert('Email already registered');

  const profileData = await request.json();
  dispatch(setAuthUser(profileData));

  !profileData.address 
    ? data.navigate('/boxes') 
    : data.navigate('/profile');
}

//------------fetching server to authenticate the user
export const authUserThunk = (data) => async (dispatch) => {
  const request = await fetch(`/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (request.status === 401) alert('user not found, please try again');

  const profileData = await request.json();
  dispatch(setAuthUser(profileData));

  !profileData.address 
    ? data.navigate('/boxes') 
    : data.navigate('/profile');
}

//------------fetching server to signout the user
export const signOutThunk = (navigate) => async (dispatch) => {
  const request= await fetch('/auth/signout');

  if (request.status === 200) {
    dispatch(noUser());
    navigate('/home');
  } 
}

//--------------checking if the user is logged in
export const checkUserThunk = () => async (dispatch) => {
  const request = await fetch('/auth/checkUser');
  const profileData = await request.json();

  dispatch(setAuthUser(profileData));

  if (!profileData.id) dispatch(noUser());
}
