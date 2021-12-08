import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { updateProfileThunk } from "../../store/user/profile/actions";
import { ActionButton } from "../Buttons/ActionButton";
import { YMaps, Map, SearchControl, GeolocationControl, Placemark } from 'react-yandex-maps';

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
    <>
    {/* <div className="mt-4 flex justify-center">
      <h1 className="p-4 rounded-xl bg-gray-200 text-4xl tracking-tight font-bold text-gray-900 sm:text-4xl md:text-4xl">Your Profile</h1>
    </div> */}
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
    <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
      <div className="p-4 md:p-12 text-center lg:text-left">
          <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
            {profileData.store_img
            ? <img src={profileData.store_img} 
            className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
            />
            : <img src="https://www.pariyes.net/wp-content/uploads/2021/06/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
            className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
            />}
          </div> 
        { !isEdit &&
          <>
          <h1 className="text-3xl font-bold pt-8 lg:pt-0">{profileData.name}</h1>
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"/></svg> {profileData.email}</p>
          <p className="ml-7 text-base font-bold flex items-center justify-center lg:justify-start">{profileData.phone}</p>
          <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z"/></svg> {profileData.address}</p>
          </>
        }
        { isEdit &&
          <form onSubmit={formHandler}> 
            <input 
            type='text' 
            name="name" 
            defaultValue={profileData.name}
            className="rounded-md mb-2 text-3xl font-bold pt-8 lg:pt-0"/>
            
            <input 
            type='text' 
            name="email" 
            defaultValue={profileData.email}
            className="rounded-md pt-4 text-base font-bold flex items-center justify-center lg:justify-start"/>

            <input 
            type='text' 
            name="phone" 
            defaultValue={profileData.phone}
            className="mb-2 rounded-md pt-4 text-base font-bold flex items-center justify-center lg:justify-start"/>

            <div>
              <YMaps query={{apikey: 'a9e98eaf-d4c4-45e6-9ee4-5afad392d357'}}>
                <Map 
                  state={{ center: [lat, lon], zoom: 9 }} 
                  width={'300px'} height={'250px'} 
                  options={{autoFitToViewport: 'always'}} 
                  modules={["geolocation", "geocode"]}
                >
                <Placemark geometry={[lat, lon]} />
                <SearchControl 
                  options={{ float: 'right' }} 
                  onResultSelect={async (e) => {
                    const index = e.get('index');
                    const res = await e.originalEvent.target.getResult(index);
                    
                    SetAddress(res.getAddressLine());
                    const coord = res.geometry.getCoordinates();
                    SetLat(coord[0]);
                    SetLon(coord[1]);    
                  }}/>
                </Map>
              </YMaps>
            </div>

            <div className="mb-2 mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            
            <label>Change Your Image</label><br/>
            <input type='file' name='store_img'/><br/>

            <button 
            type="submit"
            className="mt-3 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
              Save Changes
            </button> 
          </form>
        }
        {!isEdit && 
        <div className="pt-12 pb-8">
          <button 
          onClick={() => SetEdit(true)}
          className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
            Edit Profile
          </button> 
          
          <Link to='/crm/boxes/active'>
            <button 
            className="ml-4 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
              Active Boxes
            </button> 
          </Link>
          <Link to='/crm/orders/active'>
            <button
            className="ml-4 mt-2 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
              Active Orders
            </button> 
          </Link>
        </div>
        }
    </div>

    </div>
      <div className="w-full h-4/6 lg:w-2/5">
        {profileData.store_img
        ? <img src={profileData.store_img} 
        className="object-cover h-full rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
        />
        : <img src="https://as1.ftcdn.net/v2/jpg/02/68/55/60/1000_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg"
        className="object-cover h-full rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
        />}
      </div>
  </div>
  </>
  
  )
}

  {/* {
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
  }
    </> */}

      {/* <GeolocationControl options={{ float: 'left' }} onLocationChange={(e) => {
        console.log(e);
      }}/> */}
