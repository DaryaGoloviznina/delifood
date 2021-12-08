import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { LinkButton } from '../Buttons/LinkButton';
import { NavBusiness } from './business/NavBusiness';
import { NavNoUSer } from './no user/NavNoUser';
import { NavClient } from './user/NavClient';
import { MapModal } from "../Modals/ModalMap/MapModal";
import { useState } from 'react';

export const Nav = () => {
  const location = useLocation();
  const user = useSelector((store) => (store.auth?.user));
  const [modalState, SetModalState] = useState(false);

  console.log('userrr=>', user)
  
  return (
    !/home/.test(location.pathname) &&
    <>
      <head>
        <script 
          src="https://api-maps.yandex.ru/2.1/?apikey=a9e98eaf-d4c4-45e6-9ee4-5afad392d357&lang=en_US" type="text/javascript">
        </script>
      </head>
      <nav className="bg-green-700 pt-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              {/* logo */}
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <span className="font-medium text-white hover:text-gray-900 text-3xl font-extrabold">
                    DeliFood
                  </span>
                </div>
              { user && !user?.address &&
              <div className="flex items-center max-w-md space-x-2 mx-8" >
                <div className='max-w-xs flex items-center justify-center space-x-2'>
                  <img src='/img/icons/location-mark.svg' className='h-7 sm:h-6'/>
                  <span className='text-white text-sm'>{user?.location?.address}</span>
                  </div>
                  {/* <input value='Change location' type='button' onClick={()=> SetModalState(true)}/> */}
                  <button className='flex-2 px-3 py-2 rounded-md text-sm font-medium ml-2 bg-white text-dark hover:bg-gray-400' onClick={()=> SetModalState(true)}>Change location</button>
                  <MapModal 
                    modalState={modalState} 
                    SetModalState={SetModalState}
                  />
                </div>
              }
              </div>
            </div>
            {!user
            && <NavNoUSer/>
            }
            { user && !user?.address &&
              <NavClient />
            }
            { user?.address &&
              <NavBusiness />
            }
          </div>
        </div>
      </nav>
    </>
  )
}
