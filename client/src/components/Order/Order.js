import React, {useContext} from "react";
import './box.css';
import Context from '../../context';
import {formateDate} from '../../lib/formateTimeFunctions';
import { editBoxAC, deleteBoxAC } from '../../store/restCRM/actions.js';
import { useDispatch } from "react-redux";

export const Box = ({box}) => {  return (
  <div className='card'>
    <p>Name: {box.name}</p>
    <p>Count: {box.count}</p>
    <p>Date: {box.date}</p>
    <p>Time: {box.timeFrom} - {box.timeTo}</p>
    <p>Price: {box.price}</p>
    <button onClick={editBoxInfo} className='boxbutt'>Edit</button>
    <button onClick={deleteBox} className='boxbutt'>Delete</button>
  </div>
);
};
