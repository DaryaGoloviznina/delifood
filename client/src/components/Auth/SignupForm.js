import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link , useNavigate} from "react-router-dom";
import { ActionButton } from '../ui components/Buttons/ActionButton'
import { registerUserThunk } from '../../store/user/auth/actions.js'
import { Map, SearchControl, YMaps } from 'react-yandex-maps';
import { OptionsCuisine } from '../BoxesPage/filterBar/filterOptions/OptionsCuisine';
import { getUserLocationThunk, setUserLocation } from '../../store/user/UserLocation/actions';

export const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLocation = useSelector((store) => store.auth.location);
  
  const [userButton, setUser] = useState(true);
  const [businessButton, setBusiness] = useState(false);

  const [lon, SetLon] = useState(null);
  const [lat, SetLat] = useState(null);
  const [address, SetAddress] = useState(null);
  const [countryCode, SetCountryCode] = useState(null);

  const changeForm = () => {
    setUser(!userButton);
    setBusiness(!businessButton);
  }

  const registerUser = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const password = event.target.password.value;
    const confirm_password = event.target.confirm_password.value;
    const cuisine = event.target?.cuisine?.value;
    
    //---------if password matches, we dispatch user's info into thunk 
    if (password === confirm_password) {
      dispatch(registerUserThunk({name, address, email, password, address, lon, lat, phone, cuisine, countryCode, navigate}));
    } else {
      alert('passwords do not match');
    }
  }

  //---------getting user's location when mounting
  useEffect(() => {
    if (!userLocation) dispatch(getUserLocationThunk());
  }, [])
  
  return (
    <>
    <div className="pt-11 mt-5 flex items-center justify-center">
      <ActionButton content="User" func={changeForm}/>
      <ActionButton content="Restaurant" func={changeForm}/>
    </div>

    <div className="flex items-center mt-11 mb-20">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            { businessButton && 
              <img className="object-cover rounded-lg w-full h-full" 
              src="https://images.unsplash.com/photo-1595257841889-eca2678454e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80"
              alt="img" />
            }
            { userButton && 
              <img className="object-cover rounded-lg w-full h-full" 
              src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=960&q=80"
              alt="img" />
            }
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form 
            className="w-full"
            onSubmit={registerUser}>
              <div className="flex justify-center">
                <img src="https://img.icons8.com/office/40/000000/broccoli.png"
                alt="broccoli"/>
              </div>
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                Sign Up
              </h1>
              { userButton && <>
                <div className="mt-4">
                  <p className="text-sm text-center text-gray-500">
                    Register to get your mystery box and support our mission 
                  </p>
                </div>
                <div className="mt-4">
                  <label className="block text-sm">
                    Username
                  </label>
                  <input type="text"
                    name="name"
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                    placeholder="Username" />
                </div>
              </>
              }
              { businessButton && 
                <>
                <div className="mt-4">
                  <p className="text-sm text-center text-gray-500">
                    Register to start creating your mystery box and help get our planet waste-free
                  </p>
                </div>
                <div className="mt-4">
                  <label className="block text-sm">
                    Business Name
                  </label>
                  <input type="text"
                    name="name"
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                    placeholder="Business Name" />
                </div>
                <div className="mt-4">
                <label className="block text-sm">Address</label>
                  <YMaps 
                    query={{apikey: 'fd56ec54-348d-47a6-8ba7-17e1dd585174', lang: 'en_US'}}
                  >
                    <Map 
                      state={{ center: [userLocation?.lat, userLocation?.lon], zoom: 9 }} 
                      width={'100%'} height={'250px'} 
                      options={{autoFitToViewport: 'always'}} 
                      modules={["geolocation", "geocode"]}
                    >
                      <SearchControl 
                        options={{ float: 'right' }} 
                        onResultSelect={async (e) => {
                          const res = await e.originalEvent.target.getResult(0);

                          SetAddress(res.getAddressLine());
                          SetCountryCode(res.getCountryCode());
                          const [lantitude, longitude] = res.geometry._coordinates;
                          SetLat(lantitude);
                          SetLon(longitude);    
                        }}
                      />
                    </Map>
                  </YMaps>
                </div>
                <div className="mt-4">
                  <label className="block text-sm">Pick Cuisine</label>
                  <select
                    name="cuisine"
                    className="px-4 py-3 w-full border-gray-500 text-gray-500 rounded-md bg-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                      <OptionsCuisine />
                  </select>
                </div>
                </>
                }
              <div className="mt-4">
                <label className="block text-sm">
                  Email
                </label>
                <input 
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                  placeholder="Email Address" />
              </div>
              <div className="mt-4">
                  <label className="block text-sm">
                    Phone
                  </label>
                  <input type="tel"
                    name="phone"
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                    placeholder="Your phone number" />
                </div>
              <div>
                <label className="block mt-4 text-sm">
                  Password
                </label>
                <input
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                  placeholder="Password" 
                  name="password"
                  type="password" />
              </div>
              <div>
                <label className="block mt-4 text-sm">
                  Confirm Password
                </label>
                <input
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                  placeholder="Confirm Password" 
                  name="confirm_password"
                  type="password" />
              </div>
              <button
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue"
                type="submit">
                Sign Up
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm">
                  Already have an account?
                  <Link to="/auth/login">
                    <a className="ml-1 text-green-600 hover:underline"> 
                      Log In.
                    </a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}