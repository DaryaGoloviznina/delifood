import React, {useState} from "react";
import { BoxesList } from "../BoxesList/BoxesList";
import { ActionButton } from "../Buttons/ActionButton";
import Context from '../../context'

import './restcrm.css'

export const RestCRM = () => {
  const [modalState, SetModalState] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [inputValues, setInputValues] = useState(null);
  
  // это информация для модалки при создании нового бокса
  function addNewBox(){
    SetModalState(true);
    setInputValues(null);
    setModalInfo({title: 'Create new box', textButton: 'Create', func: sendBoxtoDB})
  }

  // функция отправляющая в бд новый бокс
  function sendBoxtoDB (e) {
    e.preventDefault();
    // этот участок кода будет на беке, он для того, чтобы записать  время сегодняшней даты из строки
      let [hours, minites] = e.target.timeFrom.value.split(':');
      if (hours[0]=== 0) hours = hours[1];
      if (minites[0]=== 0) minites = minites[1];
      let date = new Date(new Date().setHours(hours, minites))
    // тут он заканчивается
    SetModalState(false)
  }
  
  return (
    <Context.Provider value={ {modalState, SetModalState, modalInfo, setModalInfo, inputValues, setInputValues} }>
    <div>
      <div className="addButton">
      <ActionButton id="addButton" content={"+ Add box"} func={addNewBox}/>
      </div>
      <ul class="flex bg-green-700 h-16 items-center">
      <li class="mr-6">
      <a class="text-blue-50 hover:text-green-900" href="#">Active</a>
      </li>
      <li class="mr-6">
      <a class="text-blue-50 hover:text-green-900" href="#">Picked Up</a>
      </li>
      <li class="mr-6">
      <a class="text-blue-50 hover:text-green-900" href="#">Expired</a>
      </li>
      </ul>
      <BoxesList modalState={modalState} SetModalState={SetModalState} modalInfo={modalInfo} setModalInfo={setModalInfo} setInputValues={setInputValues} inputValues={inputValues} />
    </div>
    </Context.Provider>
  );
};


