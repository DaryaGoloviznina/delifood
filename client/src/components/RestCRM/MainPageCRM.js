import {useState, useEffect} from "react";
import { BoxesList } from "./BoxesList/BoxesList";
import Context from '../../context';
import { useDispatch, useSelector } from "react-redux";
import {formateDate} from '../../lib/formateTimeFunctions';
import { useParams } from "react-router-dom";
import { getBoxes, createNewBox } from '../../store/restCRM/actions'
import { RestCRMNavigation } from "./RestCRMNavigation";

export const MainPageCRM = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [modalState, SetModalState] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [inputValues, setInputValues] = useState(null);

  const user = useSelector((store) => (store.auth?.user));
  
  useEffect(() => {
    (async () => {
      dispatch(getBoxes(params.id, user?.id))
    })();
  }, [dispatch, params.id, user]);
  
  //------- data for modal once new box is created 
  function addNewBox(){
    SetModalState(true);
    setInputValues(null);
    setModalInfo({title: 'Create new box', textButton: 'Create', func: sendBoxtoDB})
  }

  // --------- function that adds new box to db
  function sendBoxtoDB (e) {
    e.preventDefault();
    SetModalState(false);

    dispatch(createNewBox({
      name: e.target.name.value,
      count: e.target.count.value,
      price: e.target.price.value,
      start_date: formateDate(e.target.timeFrom.value, 'now'),
      end_date: formateDate(e.target.timeTo.value, 'now'),
      descr: e.target.description.value,
      store_id: user?.id
    }, params.id));
  }
  
  return (
    <Context.Provider value={{modalState, SetModalState, modalInfo, setModalInfo, inputValues, setInputValues}}>
    <div>
      <div className="mb-12 mt-10">
        <RestCRMNavigation
        addNewBox={addNewBox} />
      </div>
      
      <div className="container mx-auto flex justify-center flex-wrap mb-10">
        <BoxesList 
        modalState={modalState} 
        SetModalState={SetModalState} 
        modalInfo={modalInfo} 
        setModalInfo={setModalInfo} 
        setInputValues={setInputValues} 
        inputValues={inputValues} />
      </div>
    </div>
    </Context.Provider>
  );
};


