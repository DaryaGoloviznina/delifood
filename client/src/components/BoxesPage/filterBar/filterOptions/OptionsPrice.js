import { useContext } from "react";
import Context from '../../../../context'

export const OptionsPrice = () => {
  const { price: selected } = useContext(Context).pickedOptions;
  
  const options = [
    {
      value: "anyPrice",
      content: 'Any Price',
    },
    {
      value: "ASC",
      content: 'Low to High',
    }, 
    {
      value: "DESC",
      content: 'Hight to Low',
    },
  ];

  return options.map((el) => 
    <option 
      value={el.value}
      selected={selected === el.value && 'selected'}
    >
      {el.content}
    </option>
    )
}