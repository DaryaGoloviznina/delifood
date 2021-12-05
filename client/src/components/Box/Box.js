import React, {useContext} from "react";
import './box.css';
import Context from '../../context';
import {formateDate} from '../../lib/formateTimeFunctions';
import { editBoxAC, deleteBoxAC } from '../../store/restCRM/actions.js';
import { useDispatch } from "react-redux";

export const Box = ({box}) => {

  
  const { SetModalState, setModalInfo, setInputValues } = useContext(Context);
  const dispatch = useDispatch();
  // функция для редактирования бокса - fetch + dispatch
  async function sendEditBoxToDB(e){
    e.preventDefault();
    
    console.log(box.id)
  // const formData = new FormData(e.target)
    let request = await fetch(`/crm/box/edit`, { // Вынести в санки?
      method: 'POST', // patch
      headers: { 'Content-Type': 'application/json' }, // убрать
      body: JSON.stringify({
        id: box.id,
        name: e.target.name.value,
        count: e.target.count.value,
        price: e.target.price.value,
        start_date: formateDate(e.target.timeFrom.value, box.start_date),
        end_date: formateDate(e.target.timeTo.value, box.start_date),
        // store_id: 1 // ИЗМЕНИТЬ НА НАСТОЯЩИЙ ID!!!
      }),
    });
    let response = await request.json();
    dispatch(editBoxAC(box.id, response))
    console.log('UPDATED BOX', response)
    SetModalState(false)
  }

  function editBoxInfo(){
    console.log()
    setInputValues({name: box.name, count: box.count, timeFrom: box.timeFrom, timeTo: box.timeTo, price: box.price});
    setModalInfo({title: 'Edit box', textButton: 'Save', func: sendEditBoxToDB})
    SetModalState(true);
  }

  async function deleteBox(){
    dispatch(deleteBoxAC(box.id))
    await fetch(`/crm/box/delete`, { // Вынести в санки?
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: box.id,
      }),
    });
  }
  //Return Component
  return (
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

