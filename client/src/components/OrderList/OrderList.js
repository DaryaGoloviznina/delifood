import React, {useState} from "react";
import { Box } from '../Box/Box';
import { ModalBox } from "../ModalBox/ModalBox";
import { useSelector, useDispatch } from "react-redux";

export const OrderList = () => {


  const arr = useSelector((store) => store.restCRM.boxes);

  return (
    <div>
    {arr.map((el)=> <Box box={el} />)}

    </div>
  );
};

