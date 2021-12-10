import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Context from '../../context';
import { getAllBoxesThunk, getFilteredBoxesThunk } from '../../store/boxes/actions'
import { getUserLocationThunk, setUserLocation } from "../../store/user/UserLocation/actions";

import { FilterNav } from "./filterBar/FilterNav";
import { ModalInfo } from "../ui components/Modals/universal/ModalInfo";
import { RestMap } from "../ui components/Map/Map";
import { ListBoxes } from "./ListBoxes";

export const BoxesPage = () => {
  const dispatch = useDispatch();
  const boxes = useSelector((store) => (store.boxes?.boxes));
  const userLocation = useSelector((store) => store?.auth?.location);
  const [endOrderModal, setEndOrderModal] = useState(false) // показ модальное окно завершения заказа клиента
  const [mode, SetMode] = useState('listBox');

  const defaultState = {
    cuisine: 'Any Cuisine',
    price: 'anyPrice',
    time: 'anyTime',
  }

  const [pickedOptions, setOptions] = useState(defaultState);
  
  const modeHandler = (newState) => {
    if (mode === newState) return;
    SetMode(newState);
  }

  useEffect(() => {
    if (!userLocation) dispatch(getUserLocationThunk());
    // return () => dispatch(setUserLocation(null))
  }, [])

  useEffect(() => {
    dispatch(getAllBoxesThunk(userLocation));
  }, [userLocation]);

  // useEffect(() => {
  //   dispatch(getFilteredBoxesThunk(pickedOptions));
  // }, [mode]);

  return (
    <Context.Provider 
      value={{
        modeHandler,
        userLocation,
        pickedOptions,
        setOptions,
        defaultState,
        endOrderModal,
        setEndOrderModal,
      }}
    >
      <main className="bg-gray-100">
        <div className="antialiased text-gray-900 font-sans p-6">
          <div className="container mx-auto">
            <div className="flex flex-wrap -mx-4 justify-center">
              <FilterNav />
              {
                mode === 'listBox' 
                && boxes.length !== 0 
                &&
                <ListBoxes 
                  boxes={boxes}
                />
              }
              
            { 
              mode === 'map' 
              && boxes.length !== 0
              &&
              <div
                className='w-screen shadow my-5 rounded-xl'
              >
                <RestMap 
                  boxes={boxes}
                />
              </div>
            }
              {
              !boxes.length && 
                <div className="container h-80 text-center mt-36">
                  <p className="uppercase text-gray-400 font-bold">
                    No boxes were found
                  </p>
                  <p className="uppercase text-gray-400 font-bold">
                    Or no Delifood's partners in your country
                  </p>
                </div>
              }
              
            </div>
          </div>
        </div>
        {endOrderModal 
        ? 
          <ModalInfo
            modalInfoState={endOrderModal}
            setModalInfoState={setEndOrderModal}
            info={'Success! Check your orders in your profile!'}
            img={<img src="https://img.icons8.com/doodle/48/000000/firework-explosion.png"/>}
          />
        : 
          null
        }
      </main>
    </Context.Provider>

  )
}
