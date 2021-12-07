import {useState, useContext} from "react";
import { Box } from '../Box/Box';
import { ModalBox } from "../ModalBox/ModalBox";
import { useSelector } from "react-redux";
import { ModalInfo } from "../ModalInfo/ModalInfo";
import Context from '../../context'
import { useParams } from "react-router-dom";
import { deleteAllBoxes } from '../../store/restCRM/actions'
import { useDispatch } from "react-redux";

export const BoxesList = () => {
  const params = useParams();
  const { modalState } = useContext(Context);
  const [modalInfoState, setModalInfoState] = useState(false);
  const arr = useSelector((store) => store.restCRM.boxes);
  const modalInformation = "Вы не можете удалить бокс"
  const dispatch = useDispatch();

  function deleteAll(){
    let arrId = []
    for (let el of arr ){
      arrId.push(el.id)
    }
    dispatch(deleteAllBoxes(arrId))
  }

  return (
    <div>
    {  params.id !== 'active' && <button onClick={deleteAll}>DELETE ALL</button> }
    { arr.map((el)=> <Box key={el.id} box={el} setModalInfoState={setModalInfoState}/>) }
    {  modalState && <ModalBox /> }
    <ModalInfo info={modalInformation} modalInfoState={modalInfoState} setModalInfoState={setModalInfoState} />
    </div>
  );
};

