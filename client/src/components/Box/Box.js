import { useContext, useState } from "react";
import './box.css';
import Context from '../../context';
import {formateDate} from '../../lib/formateTimeFunctions';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editBoxes, delBox } from '../../store/restCRM/actions'
import { DeleteModal } from "./DeleteModal";

export const Box = ({box, setModalInfoState}) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  
  const { SetModalState, setModalInfo, setInputValues } = useContext(Context);
  // функция для редактирования бокса - fetch + dispatch
  async function sendEditBoxToDB(e){
    e.preventDefault();
    dispatch(editBoxes({
      id: box.id,
      name: e.target.name.value,
      count: e.target.count.value,
      price: e.target.price.value,
      start_date: formateDate(e.target.timeFrom.value, box.start_date),
      end_date: formateDate(e.target.timeTo.value, box.start_date),
      descr: e.target.description.value
      // store_id: 1 // ИЗМЕНИТЬ НА НАСТОЯЩИЙ ID!!!
    }, box.id))
    SetModalState(false)
  }

  function editBoxInfo(){
    setInputValues({name: box.name, count: box.count, timeFrom: box.timeFrom, timeTo: box.timeTo, price: box.price, description: box.descr});
    setModalInfo({title: 'Edit box', textButton: 'Save', func: sendEditBoxToDB})
    SetModalState(true);
  }

  async function deleteBox(){
    dispatch(delBox(params.id, box.id, setModalInfoState));
    setShowModal(false);
  }
  
  return (
    <>
    <div className='card'>
      <p>Name: {box.name}</p>
      <p>Total/reserved/bought: {box.count}/{box.count_reserved}/{box.count_bought}</p>
      <p>Date: {box.date}</p>
      <p>Time: {box.timeFrom} - {box.timeTo}</p>
      <p>Price: {box.price}</p>
      <button onClick={editBoxInfo} className='boxbutt'>Edit</button>
      <button onClick={()=> setShowModal(true)} className='boxbutt'>Delete</button>
      {showModal
      ? <DeleteModal
        box={box}
        deleteBox={deleteBox}
        setShowModal={setShowModal}/>
      : null }
    </div>
    </>
  );
};

