import { Box } from "./SingleBox"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoxesThunk } from '../../store/boxes/actions'
import { FilterNav } from "./filterBar/FilterNav";
import { getUserLocationThunk } from "../../store/user/clientLocation/actions";
import { ModalInfo } from "../ui components/Modals/universal/ModalInfo";

export const BoxesPage = () => {
  const dispatch = useDispatch();
  const boxes = useSelector((store) => (store.boxes?.boxes));
  const user = useSelector((store) => (store.auth?.user));
  const [endOrderModal, setEndOrderModal] = useState(false) // показ модальное окно завершения заказа клиента

  useEffect(() => {
    dispatch(getAllBoxesThunk(42));
    if (user && !user.address) dispatch(getUserLocationThunk());
  }, []);

  return (
    <main className="bg-gray-100">
      <div className="antialiased text-gray-900 font-sans p-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4 justify-center">
          <FilterNav />
            {boxes.map((el) => {
              
              return (
                <Box
                user={user}
                el={el}
                key={el.id}
                setEndOrderModal={setEndOrderModal}
                />
              )
            })}
            { !boxes.length && 
              <div className="container h-80 text-center mt-36">
                <p className="uppercase text-gray-400 font-bold">
                  No boxes were found 
                </p>
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
