import { ACTypes } from "../types";

export const setAuthUser = (id, name, email) => ({type: ACTypes.SET_AUTH_USER, payload: {id, name, email}});
export const setAuthBusiness = (id, name, email, address) => ({type: ACTypes.SET_AUTH_BUSINESS, payload: {id, name, email, address}});
export const noUser = () => ({type: ACTypes.SIGNOUT});

//------------fetching server to register the user
export const registerUserThunk = (data) => async (dispatch) => {
  let request = await fetch(`/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      address: data?.address,
      email: data.email,
      password: data.password,
    }),
  });
  
  if (request.status === 401) alert('Email already registered');

  const { id, name, email, address } = await request.json();

  if (!address) {
    dispatch(setAuthUser(id, name, email));
    data.navigate('/boxes');
  } else {
    dispatch(setAuthBusiness(id, name, email, address ));
    data.navigate('/');
  }
}

//------------fetching server to authenticate the user
export const authUserThunk = (data) => async (dispatch) => {
  console.log(data.email, data.password);
  const request = await fetch(`/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (request.status === 401) alert('user not found, please try again');

  const { id, name, email, address } = await request.json();
  
  if (!address) {
    dispatch(setAuthUser(id, name, email));
    data.navigate('/')
  } else {
    dispatch(setAuthBusiness(id, name, email, address ));
    data.navigate('/')
  }
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
export const checkUserThunk = (arg) => async (dispatch) => {
  const request = await fetch('/auth/checkUser');
  const { id, name, email, address } = await request.json();

  if (!address) {
    dispatch(setAuthUser(id, name, email));
  } else {
    dispatch(setAuthBusiness(id, name, email, address ));
  } 
  if (!id) {
    dispatch(noUser());
  }
}