import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Context from '../../../context';
import { FilterSelect } from './FilterSelect';
import { OptionsCuisine } from './filterOptions/OptionsCuisine';
import { OptionsTime } from './filterOptions/OptionsTime';
import { 
  getFilteredBoxesThunk, 
  getSearchedBoxesThunk,
} from '../../../store/boxes/actions';
import { OptionsPrice } from './filterOptions/OptionsPrice';
import { defaultState } from '../../../lib/consts/defFiltState';

export const FilterNav = () => {
  const {
    modeHandler, 
    userLocation, 
    pickedOptions, 
    setOptions, 
  } = useContext(Context);
  
  const dispatch = useDispatch();
  const [query, SetQuery] = useState('');
  
  //-------------dispatching user's choices with every state change
  useEffect(() => {
    dispatch(getFilteredBoxesThunk(pickedOptions, userLocation));
  }, [pickedOptions, userLocation]);
  
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
    <div className="w-screen shadow p-5 rounded-lg bg-white">
      <div className="relative">
        <input 
          type="text" 
          name="search"
          value={query}
          onChange={searchHandler}
          placeholder="Search by restaurant name or location"  
          className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
        />
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
            name='map'
            onClick={(e) => modeHandler(e.target.name)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md mr-2"
          >
            Show on Map
          </button>
          <button
            onClick={(e) => modeHandler(e.target.name)}
            name='listBox'
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md mr-2"
          >
            Show List
          </button>

            <button 
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-medium rounded-md"
              onClick={() => setOptions(defaultState)}
            >
              Reset Filter
            </button>
          </div>
        </div>

        <div >
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            <FilterSelect
              name={'cuisine'}
              onChange={onChangeHandler}
            >
              <OptionsCuisine />
            </FilterSelect>

            <FilterSelect
              name={'price'}
              onChange={onChangeHandler}
            >
              <OptionsPrice />
            </FilterSelect>

            <FilterSelect
              name={'time'}
              onChange={onChangeHandler}
            >
              <OptionsTime />
            </FilterSelect>
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
