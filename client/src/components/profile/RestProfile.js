import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateProfileThunk } from "../../store/user/profile/actions";
import { ActionButton } from "../Buttons/ActionButton";
import { YMaps, Map, SearchControl, GeolocationControl } from 'react-yandex-maps';
import { Link } from 'react-router-dom'

export const RestProfile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((store) => store.auth.user) ?? {};
  const [isEdit, SetEdit] = useState(false);
  
  const [lon, SetLon] = useState(profileData?.lon);
  const [lat, SetLat] = useState(profileData?.lat);
  const [address, SetAddress] = useState(profileData?.address);

  const formHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    formData.append('lat', lat);
    formData.append('lon', lon);
    formData.append('address', address);
    dispatch(updateProfileThunk(formData))
    SetEdit(false);
  }

  return (
    !isEdit 
    ? 
    <>
      {Object.entries(profileData).map(([key, value]) => {
        if (
          key !== 'id'
          && key !== 'lon'
          && key !== 'lat'
          && key !== 'store_img'
        ) return <p key={key}>{value}</p>
      })}
      <ActionButton content={'Edit'} func={() => SetEdit(true)}/>
      {/* <div>
        <Link to='/all'><button>ВСЕ</button></Link>
      </div> */}
    </>
    : 
    <form onSubmit={formHandler}>
      {Object.entries(profileData).map(([key, value]) => {
        if (key === 'name') return (
          <>
            <input type='text' key={key} name={key} defaultValue={value} /><br/>
          </>
        );
        if (key === 'email') return (
          <>
            <input type='email' name={key} defaultValue={value} /><br/>
          </>
        );
        if (key === 'phone') return (
          <>
            <input type='tel' name={key} defaultValue={value} /><br/>
          </>
        );
      })}
        <YMaps query={{apikey: 'a9e98eaf-d4c4-45e6-9ee4-5afad392d357'}}>
          <Map 
            state={{ center: [lat, lon], zoom: 9 }} 
            width={'300px'} height={'250px'} 
            options={{autoFitToViewport: 'always'}} 
            modules={["geolocation", "geocode"]}
          >
            <SearchControl 
              options={{ float: 'right' }} 
              onResultSelect={async (e) => {
                const index = e.get('index');
                const res = await e.originalEvent.target.getResult(index);
                
                SetAddress(res.getAddressLine());
                const coord = res.geometry.getCoordinates();
                SetLat(coord[0]);
                SetLon(coord[1]);    
              }}
            />
          </Map>
      </YMaps>
      
      <label>Изменить баннер вашего магазина:</label><br/>
      <input type='file' name='store_img'/><br/>
      <ActionButton content={'Save'} type='submit'/>
    </form>
  )
}

      {/* <GeolocationControl options={{ float: 'left' }} onLocationChange={(e) => {
        console.log(e);
      }}/> */}
