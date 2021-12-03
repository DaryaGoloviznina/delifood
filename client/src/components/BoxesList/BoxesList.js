import React, {useState} from "react";
import { Box } from '../Box/Box';
import { ModalBox } from "../ModalBox/ModalBox";


export const BoxesList = () => {

  const [list, setList] = useState([{name: 'box 1', count: 3, timeFrom: '14:00', timeTo: '20:00', price: 5}, {name: 'box 2', count: 1}, {name: 'box 3', count: 6}])


  return (
    <div>
    {list.map((el)=> <Box box={el} />)}

    <ModalBox />
    </div>
  );
};

