import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { updateProfileThunk } from "../../store/user/profile/actions";
import { ActionButton } from "../ui components/Buttons/ActionButton";
import { YMaps, Map, SearchControl, GeolocationControl, Placemark } from 'react-yandex-maps';

export const RestProfile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((store) => store.auth.user) ?? {};
  const [isEdit, SetEdit] = useState(false);

  console.log('profileData=>', profileData)
  
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
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
    <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
      <div className="p-4 md:p-12 text-center lg:text-left">
        <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
          {profileData.store_img
            ? 
            <img src={profileData.store_img} 
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
            />
            : 
            <img src="https://as1.ftcdn.net/v2/jpg/02/68/55/60/1000_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg"
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
            />
          }
        </div> 
        { !isEdit &&
          <>
            {Object.entries(profileData).map(([key, value]) => {
              if (key === 'name') return (
                <>
                  <h1 key={key} className="text-3xl font-bold pt-8 lg:pt-0">{value}</h1>
                  <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                </>
              )
              if (key === 'email') return (
                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                  {/* <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"/>
                  </svg>  */}
                  <img 
                  className="pr-4 mr-1 ml-1 mb-1"
                  src="https://img.icons8.com/external-becris-lineal-becris/25/000000/external-work-finance-taxation-becris-lineal-becris.png"/>
                  {value}
                </p>
              )
              if (key === 'phone') return (
                <p className=" text-gray-600 text-sm  flex items-center justify-center lg:justify-start">
                  <img 
                  className="pr-4 mr-1  mb-1"
                  src="https://img.icons8.com/windows/30/000000/phone.png"/>
                  {profileData.phone}
                </p>
              )
              if (key === 'cuisine') return (
                <p className="mr-9 text-gray-600 text-xs text-base flex items-center justify-center lg:justify-start">
                  <img 
                  className="pr-4"
                  src="https://img.icons8.com/windows/30/000000/cook-male.png"/>
                  {profileData.cuisine}
                </p>
              )
              if (key === 'address') return (
                <p className="pt-2  text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                  <img 
                  className="pr-4 mr-1 ml-1 mb-1"
                  src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/24/000000/external-world-web-and-social-media-flatart-icons-outline-flatarticons.png"/>
                  {profileData.address}
                </p>
              )
            })
            }
          </>
        }
        { isEdit &&
          <form onSubmit={formHandler}>
            {Object.entries(profileData).map(([key, value]) => {
              if (key === 'name') return (
                <input
                  key={key}
                  type='text' 
                  name={key}
                  defaultValue={value}
                  className="rounded-md mb-2 text-3xl font-bold pt-8 lg:pt-0"/>
              )
              if (key === 'email') return (
                <input
                  key={key}
                  type='text'
                  name={key}
                  defaultValue={value}
                  className="rounded-md mb-2 text-3xl font-bold pt-8 lg:pt-0"
                />
              )
              if (key === 'phone') return (
                <input 
                  type='text' 
                  name={key} 
                  defaultValue={value}
                  className="mb-2 rounded-md pt-4 text-base font-bold flex items-center justify-center lg:justify-start"
                />
              )
              })
            }
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
        ? 
        <img src={profileData.store_img} 
          className="object-cover h-full rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
        />
        : 
        <img src="https://as1.ftcdn.net/v2/jpg/02/68/55/60/1000_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg"
          className="object-cover h-full rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
        />}
      </div>
  </div>
  </>
  )
}
