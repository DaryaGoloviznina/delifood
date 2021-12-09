import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CuisineOption } from './filterOptions/Cuisine/OptionsCuisine';
import { PickUpTimes } from './filterOptions/PickUpTimes';
import { 
  getAllBoxesThunk,
  getFilteredBoxesThunk, 
  getSearchedBoxesThunk} from '../../../store/boxes/actions';

export const FilterNav = () => {
  const dispatch = useDispatch();
  const cuisines = useSelector((store) => (store.boxes?.cuisines));
  const [query, SetQuery] = useState('');

  const defaultState = {
    cuisine: 'Any Cuisine',
    price: 'anyPrice',
    time: 'anyTime',
  }

  const [pickedOptions, setOptions] = useState(defaultState);

  //-------------dispatching user's choices with every state change
  useEffect(() => {
    dispatch(getFilteredBoxesThunk(pickedOptions));
  }, [pickedOptions]);
  
  //-------------setting state to match user's choises dynamically
  const onChangeHandler = (event) => {    
    const option = event.target.name;
    const value = event.target.value;

    setOptions({...pickedOptions,
      [option]: value
    });
  }

  const searchHandler = (e) => {
    const {value} = e.target;
    SetQuery(value);
    if (value) dispatch(getSearchedBoxesThunk(value));
    else dispatch(getFilteredBoxesThunk(pickedOptions));
  }
  
  return (
    <div className="w-screen  shadow p-5 rounded-lg bg-white">
      <div className="relative">
        <input 
          type="text" 
          name="search"
          value={query}
          onChange={searchHandler}
          placeholder="Search by restaurant name or location"  className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"/>
      </div>

      {!query 
      ?
        <>
          <div className="flex itpems-center justify-between mt-4">
          <p className="font-medium">
            Filter the boxes
          </p>

        <div>
          <button 
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md mr-2"
          onClick={() => dispatch(getAllBoxesThunk(42))}>
            All boxes
          </button>

            <button 
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-medium rounded-md"
              onClick={() => setOptions(defaultState)}
            >
              Reset Filter
            </button>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            <select
              onChange={onChangeHandler}
              name="cuisine"
              className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                {cuisines.map((el) => {
                    return (
                      <CuisineOption 
                        id={el.id}
                        cuisine={el.name}
                        selected={
                          pickedOptions.cuisine === el.name
                          ? 'selected'
                          : null
                        }
                      />
                    )
                })}
            </select>

            <select 
              onChange={onChangeHandler}
              name="price"
              className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                {[
                    {
                      value: "anyPrice",
                      content: 'Any Price',
                    },
                    {
                      value: "ASC",
                      content: 'Low to High',
                    }, 
                    {
                      valu: "DESC",
                      content: 'Hight to Low',
                    }
                  ].map((el) => {
                    if (pickedOptions.price === el.value) el.selected = 'selected';
                    return (
                      <option
                        value={el.value}
                        selected={el.selected && el.selected}
                      >{el.content}</option>
                    ) 
                    })}
            </select>

            <select 
            onChange={onChangeHandler}
            name="time"
            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
              <PickUpTimes selected={pickedOptions.time}/>
            </select>
          </div>
        </div>
      </>
      :
      <p className="font-medium my-4">
      You're searching rests by query: '{query}'
      </p>
      }
      
    </div>
  )
}
