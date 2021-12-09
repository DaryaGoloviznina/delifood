import { Box } from "./SingleBox"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoxesThunk } from '../../store/boxes/actions'
import { FilterNav } from "./filterBar/FilterNav";

import { getUserLocationThunk, setUserLocation } from "../../store/user/UserLocation/actions";
import { ModalInfo } from "../ui components/Modals/universal/ModalInfo";
import { RestMap } from "../ui components/Map/Map";

export const BoxesPage = () => {
  const dispatch = useDispatch();
  const boxes = useSelector((store) => (store.boxes?.boxes));

  const [endOrderModal, setEndOrderModal] = useState(false) // показ модальное окно завершения заказа клиента
  const [mode, SetMode] = useState('listBox');

  const modeHandler = (newState) => {
    if (mode === newState) return;
    SetMode(newState);
  }

  useEffect(() => {
    dispatch(getAllBoxesThunk());
  }, []);

  useEffect(() => {
    dispatch(getUserLocationThunk());

    return () => dispatch(setUserLocation(null))
  }, [])

  return (
    <main className="bg-gray-100">
      <div className="antialiased text-gray-900 font-sans p-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4 justify-center">
          <FilterNav mode={mode} modeHandler={modeHandler} />
          {
            mode === 'listBox' &&
            boxes.map((el) => {
              return (
                <Box
                  el={el}
                  key={el.id}
                  setEndOrderModal={setEndOrderModal}
                />
              )
            })
            }
            {
             !boxes.length && 
              <div className="container h-80 text-center mt-36">
                <p className="uppercase text-gray-400 font-bold">
                  No boxes were found 
                </p>
              </div>
            }
            
           {mode === 'map' && 
           <div
            className={'w-screen shadow my-5'}
           >
            <RestMap 
              setEndOrderModal={setEndOrderModal}
            />
           </div>
           }

          </div>
        </div>
      </div>
      {endOrderModal ? (
            <ModalInfo
            modalInfoState={endOrderModal}
            setModalInfoState={setEndOrderModal}
            info={'успешно'}
            />
          ) : null}  
    </main>
  )
}
