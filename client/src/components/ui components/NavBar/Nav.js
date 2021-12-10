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
  const userLocation = useSelector((store) => (store.auth?.location));
  const [modalState, SetModalState] = useState(false);
  
  return (
    !/home/.test(location.pathname) &&
    <>
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
              { userLocation && /boxes/.test(location.pathname) &&
              <div className="flex items-center max-w-md space-x-2 mx-8" >
                <div className='max-w-xs flex items-center justify-center space-x-2'>
                  <img src='/img/icons/location-mark.svg' className='h-7 sm:h-6'/>
                  <span className='text-white text-sm'>{userLocation?.address}</span>
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
