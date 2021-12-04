import { Box } from "./Box"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoxesThunk } from '../../store/boxes/actions'
import { FilterNav } from "./filter bar/FilterNav";

export const BoxesPage = () => {
  const dispatch = useDispatch();
  const boxes = useSelector((store) => (store.boxes?.boxes));

  console.log('reducre boxes: ', boxes)

  useEffect(() => {
    dispatch(getAllBoxesThunk(42));
  }, []);
  // const location = useLocation();

  return (
    <main className="bg-gray-100">
      <div className="antialiased text-gray-900 font-sans p-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4 justify-center">
          <FilterNav />
            {boxes.map((el) => {
              return (
                <Box
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
          </div>
        </div>
      </div>
    </main>
  )
}
