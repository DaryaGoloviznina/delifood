import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Context from '../../context';
import { getAllBoxesThunk, getFilteredBoxesThunk } from '../../store/boxes/actions'
import { getUserLocationThunk, setUserLocation } from "../../store/user/UserLocation/actions";

import { FilterNav } from "./filterBar/FilterNav";
import { ModalInfo } from "../ui components/Modals/universal/ModalInfo";
import { RestMap } from "../ui components/Map/Map";
import { ListBoxes } from "./ListBoxes";
import BoxModal from '../ui components/Modals/CustomerBoxesPage/BoxModal';
import { defaultState } from '../../lib/consts/defFiltState';

export const BoxesPage = () => {
  const dispatch = useDispatch();
  const [mode, SetMode] = useState('listBox');
  
  const boxes = useSelector((store) => (store.boxes?.boxes));
  const userLocation = useSelector((store) => store?.auth?.location); // user's location
  
  const [boxData, setBoxdata] = useState({}); // setting up data for modal
  const [showModal, setShowModal] = useState(false); // modalBox state
  const [endOrderModal, setEndOrderModal] = useState(false) // modal state when the order is finished
  const [clientOrderBoxAmount, setclientOrderBoxAmount] = useState() // setting up boxes count so it can be changed after a box is ordered
  const [changeBoxAmountFunc, SetChangeBoxAmountFunc] = useState();

  const [pickedOptions, setOptions] = useState(defaultState);
  
  const modeHandler = (newState) => {
    if (mode === newState) return;
    SetMode(newState);
  }

  //---------------activates modal and gathers data for it
  const modalBoxHandler = (boxData, boxAmount) => {
    setclientOrderBoxAmount(boxAmount);
    setBoxdata(boxData);
    
    setShowModal(true);
  }

  useEffect(() => {
    if (!userLocation) dispatch(getUserLocationThunk());
  }, [])

  useEffect(() => {
    dispatch(getAllBoxesThunk(userLocation));
  }, [userLocation]);

  return (
    <Context.Provider 
      value={{
        boxes,
        modalBoxHandler,
        modeHandler,
        pickedOptions,
        setOptions,
        endOrderModal,
        setEndOrderModal,
        setclientOrderBoxAmount,
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
                && <ListBoxes />
              }
              
            { 
              mode === 'map' 
              && boxes.length !== 0
              &&
              <div
                className='w-screen shadow my-5 rounded-xl'
              >
                <RestMap />
              </div>
            }
            {
            boxes.length === 0 && 
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
        {showModal 
          ? 
            <BoxModal
              changeBoxAmountFunc={changeBoxAmountFunc}
              showModal={showModal}
              setShowModal={setShowModal}
              boxData={boxData} 
              clientOrderBoxAmount={clientOrderBoxAmount}
              setclientOrderBoxAmount={setclientOrderBoxAmount}
              setEndOrderModal={setEndOrderModal}
            />
          : 
            null
          }
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
