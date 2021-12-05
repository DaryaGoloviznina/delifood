import {useState, useEffect} from "react";
import { BoxesList } from "../BoxesList/BoxesList";
import { ActionButton } from "../Buttons/ActionButton";
import Context from '../../context';
import { useDispatch } from "react-redux";
import { setActiveBoxesAC, addNewBoxesAC } from '../../store/restCRM/actions.js';
import {formateDate} from '../../lib/formateTimeFunctions';

import './restcrm.css'

export const RestCRM = () => {
  const [modalState, SetModalState] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [inputValues, setInputValues] = useState(null);
  const dispatch = useDispatch();
  // render boxes
  useEffect(() => {
    (async () => {
      let request = await fetch(`/crm/boxes/active`); // Вынести в санки?
      let response = await request.json();
      console.log(response)
      dispatch(setActiveBoxesAC(response))
    })();
  }, [dispatch]);
  
  // это информация для модалки при создании нового бокса
  function addNewBox(){
    SetModalState(true);
    setInputValues(null);
    setModalInfo({title: 'Create new box', textButton: 'Create', func: sendBoxtoDB})
  }


  // функция отправляющая в бд новый бокс
  async function sendBoxtoDB (e) {
    e.preventDefault();
     
    SetModalState(false)

    let request = await fetch(`/crm/box/new`, { // Вынести в санки?
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: e.target.name.value,
        count: e.target.count.value,
        price: e.target.price.value,
        start_date: formateDate(e.target.timeFrom.value, 'now'),
        end_date: formateDate(e.target.timeTo.value, 'now'),
        // store_id: 1 // ИЗМЕНИТЬ НА НАСТОЯЩИЙ ID!!!
      }),
    });
    let response = await request.json();
    dispatch(addNewBoxesAC(response))
    
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


