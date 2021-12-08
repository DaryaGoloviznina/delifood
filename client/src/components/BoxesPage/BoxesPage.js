import { Box } from "./SingleBox"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoxesThunk } from '../../store/boxes/actions'
import { FilterNav } from "./filterBar/FilterNav";
import { getUserLocationThunk } from "../../store/user/clientLocation/actions";

export const BoxesPage = () => {
  const dispatch = useDispatch();
  const boxes = useSelector((store) => (store.boxes?.boxes));
  const user = useSelector((store) => store.auth.user)
  console.log('reducer boxes: ', boxes);

  useEffect(() => {
    dispatch(getAllBoxesThunk(42));
    dispatch(getUserLocationThunk());
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
                id={el.id}
                img={el.Store.store_img}
                restName={el.Store.name}
                boxName={el.name}
                descr={el.descr}
                count={el.count}
                price={el.price}
                start_date={el.start_date}
                end_date={el.end_date}/>
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
    </main>
  )
}
