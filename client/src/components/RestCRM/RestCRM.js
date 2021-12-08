import {useState, useEffect} from "react";
import { BoxesList } from "../BoxesList/BoxesList";
import { ActionButton } from "../Buttons/ActionButton";
import Context from '../../context';
import { useDispatch, useSelector } from "react-redux";
import {formateDate} from '../../lib/formateTimeFunctions';
import { Link, useParams } from "react-router-dom";
import { getBoxes, createNewBox } from '../../store/restCRM/actions'
import './restcrm.css'

export const RestCRM = () => {
  const params = useParams();
  const [modalState, SetModalState] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [inputValues, setInputValues] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector((store) => (store.auth?.user));
  
  useEffect(() => {
    (async () => {
      dispatch(getBoxes(params.id, user?.id))
    })();
  }, [dispatch, params.id, user]);
  
  // это информация для модального окна при создании нового бокса
  function addNewBox(){
    SetModalState(true);
    setInputValues(null);
    setModalInfo({title: 'Create new box', textButton: 'Create', func: sendBoxtoDB})
  }


  // функция отправляющая в бд новый бокс
  function sendBoxtoDB (e) {
    e.preventDefault();
    SetModalState(false)
    dispatch(createNewBox({
      name: e.target.name.value,
      count: e.target.count.value,
      price: e.target.price.value,
      start_date: formateDate(e.target.timeFrom.value, 'now'),
      end_date: formateDate(e.target.timeTo.value, 'now'),
      descr: e.target.description.value,
      store_id: user?.id
    }, params.id))
  }
  
  return (
    <Context.Provider value={ {modalState, SetModalState, modalInfo, setModalInfo, inputValues, setInputValues} }>
    <div>
      <div className="addButton">
      <ActionButton id="addButton" content={"+ Add box"} func={addNewBox}/>
      </div>
      <ul class="flex bg-green-700 h-16 items-center">
      <li class="mr-6">
      <Link className="text-blue-50 hover:text-green-900" to="/crm/boxes/active">Active</Link>
      </li>
      <li class="mr-6">
      <Link className="text-blue-50 hover:text-green-900" to="/crm/boxes/picked">Picked Up</Link>
      </li>
      <li class="mr-6">
      <Link className="text-blue-50 hover:text-green-900" to="/crm/boxes/expired">Expired</Link>
      </li>
      </ul>
      <BoxesList 
      modalState={modalState} 
      SetModalState={SetModalState} 
      modalInfo={modalInfo} 
      setModalInfo={setModalInfo} 
      setInputValues={setInputValues} 
      inputValues={inputValues} />
    </div>
    </Context.Provider>
  );
};


