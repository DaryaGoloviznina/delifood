import {useState, useContext} from "react";
import { Box } from './Box';
import { ModalBox } from "../../ui components/Modals/RestCRMPage/ModalBox";
import { useSelector } from "react-redux";
import { ModalInfo } from "../../ui components/Modals/universal/ModalInfo";
import Context from '../../../context'
import { useParams } from "react-router-dom";
import { deleteAllBoxes } from '../../../store/restCRM/actions'
import { useDispatch } from "react-redux";
import { DeleteModal } from "../../ui components/Modals/RestCRMPage/DeleteModal";

export const BoxesList = () => {
  const params = useParams();
  const { modalState } = useContext(Context);
  const [modalsInfoState, setModalsInfoState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const arr = useSelector((store) => store.restCRM.boxes);
  const dispatch = useDispatch();

  function deleteAll(){
    let arrId = []
    for (let el of arr ){
      arrId.push(el.id)
    }
    dispatch(deleteAllBoxes(arrId));
  }

  return (
    <>
    {params.id !== 'active' && arr.length &&
      <div className="w-40 flex justify-center mb-4 text-center cursor-pointer text-m text-white py-2 px-4 bg-red-400 hover:bg-red-500 rounded font-normal">
        <button onClick={()=> setShowModal(true)} >
          DELETE ALL
        </button>
      </div> }
      {showModal
      ? <DeleteModal
        deleteAll={deleteAll}
        setShowModal={setShowModal}/>
      : null }
    <div className="container mx-auto flex justify-center flex-wrap">
      {!arr.length && 
        <div className="container h-60 text-center mt-36">
          <p className="uppercase text-gray-400 font-bold">
            No boxes yet!
          </p>
        </div>}
      { arr.map((el)=> <Box key={el.id} box={el} setModalInfoState={setModalsInfoState}/>) }
      {  modalState && <ModalBox /> }
      { modalsInfoState && <ModalInfo info={'You cannot delete this box as it was already ordered and pending pick up!'} 
      setModalInfoState={setModalsInfoState}
      img={<img src="https://img.icons8.com/office/30/000000/cancel-2.png"/>} /> }
    </div>
    </>
  );
};

