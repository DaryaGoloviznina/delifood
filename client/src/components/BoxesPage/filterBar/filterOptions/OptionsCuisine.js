import { useContext } from "react";
import { useSelector } from "react-redux";
import Context from '../../../../context'

export const OptionsCuisine = () => {
  const cuisines = useSelector((store) => (store.boxes?.cuisines));
  const { pickedOptions } = useContext(Context);

  return cuisines.map((el) => 
    <option 
      id={el.id}
      key={el.name}
      selected={
        pickedOptions?.cuisine === el.name 
        ? 'selected'
        : null
      }
    >{el.name}</option>
  )
}
