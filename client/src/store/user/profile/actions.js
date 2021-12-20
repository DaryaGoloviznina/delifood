import { ACTypes } from "../../types";

export const updateProfile = (profileData) => ({type: ACTypes.UPDATE_PROFILE, payload: profileData});

export const updateProfileThunk = (profileData) => async (dispatch) => {
  const request = await fetch(`/profile/update`, {
    method: 'PATCH',
    body: profileData,
  });

  if (request.status === 200) {
    const newProfileData = await request.json();

    dispatch(updateProfile(newProfileData));
  }
  else alert('Some troubles with Server!')
}