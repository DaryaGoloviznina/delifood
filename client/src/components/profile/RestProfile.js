import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateProfileThunk } from "../../store/auth/actions";
import { ActionButton } from "../Buttons/ActionButton";
import { YMaps, Map, SearchControl, GeolocationControl } from 'react-yandex-maps';

export const RestProfile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((store) => store.auth.business) ?? {};
  const [isEdit, SetEdit] = useState(false);
  
  const [lon, SetLon] = useState(0);
  const [lat, SetLat] = useState(0);

  useEffect(async () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      SetLon(longitude);
      SetLat(latitude);
    });
  })

  const formHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    SetEdit(false);
    dispatch(updateProfileThunk(formData))
  }

  return (
    !isEdit 
    ? 
    <>
      {Object.entries(profileData).map(([key, value]) => {
        if (key !== 'id') return <p key={key}>{value}</p>
      })}
      <ActionButton content={'Edit'} func={() => SetEdit(true)}/>
    </>
    : 
    <form onSubmit={formHandler}>
      {Object.entries(profileData).map(([key, value]) => {
        if (key !== 'id' && key !== 'address') return (
          <>
            <input type='text' name={key} defaultValue={value} /><br/>
          </>
        );
        if (key === 'address') return (
        <YMaps>
          <Map defaultState={{ center: [lat, lon], zoom: 9 }} width={'300px'} height={'250px'} options={{autoFitToViewport: 'always'}} modules={["geolocation", "geocode"]}>
            <SearchControl options={{ float: 'right' }}/>
            <GeolocationControl options={{ float: 'left' }} />
          </Map>
      </YMaps>
        )
      })}
      <ActionButton content={'Save'} type='submit'/>
    </form>
  )
}