import { useContext } from "react";
import { useSelector } from "react-redux";
import Context from '../../../../context'

export const OptionsCuisine = () => {
  const cuisines = useSelector((store) => (store.boxes?.cuisines));
  const { cuisine: selected } = useContext(Context).pickedOptions;

  return cuisines.map((el) => 
    <option 
      id={el.id}
      selected={
        selected === el.name && 'selected'  
      }
    >{el.name}</option>
  )
}
