import React, {useContext} from "react";
import './box.css'
import Context from '../../context'

export const Box = ({box}) => {

  
  const { SetModalState, setModalInfo, setInputValues } = useContext(Context);

  // функция для редактирования бокса 
  function sendEditBoxToDB(e){
    e.preventDefault();
    
    console.log(e.target.name.value)
    SetModalState(false)
  }

  function editBoxInfo(){
    console.log()
    setInputValues({name: box.name, count: box.count, timeFrom: box.timeFrom, timeTo: box.timeTo, price: box.price});
    setModalInfo({title: 'Edit box', textButton: 'Save', func: sendEditBoxToDB})
    SetModalState(true);
  }

  //Return Component
  return (
    <div className='card'>
      <p>Name: {box.name}</p>
      <p>Count: {box.count}</p>
      <p>Date: {box.count}</p>
      <p>Time: {box.timeFrom} - {box.timeTo}</p>
      <p>Price: {box.price}</p>
      <button onClick={editBoxInfo} className='boxbutt'>Edit</button>
      <button className='boxbutt'>Delete</button>
    </div>
  );
};

