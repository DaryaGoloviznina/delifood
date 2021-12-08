import { useContext, useState } from "react";
import Context from '../../../context';
import {formateDate} from '../../../lib/formateTimeFunctions';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editBoxes, delBox } from '../../../store/restCRM/actions'
import { DeleteModal } from "../../ui components/Modals/RestCRMPage/DeleteModal";

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
    <div
    key={box.id}
    className="antialiased text-gray-900 font-sans p-6">
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        <div className="w-80">
          <div className="c-card block bg-white shadow-xl hover:shadow-2xl rounded-lg overflow-hidden">
            <div className="bg-crm-image bg-cover p-5 border-b">
              <span className="px-2 py-1 leading-none bg-yellow-200 text-yellow-800 rounded-full font-semibold uppercase tracking-wide text-m">{box.name}</span>
              <p className="mt-1 ml-1 text-xs text-white font-medium">Created on {box.date}</p>
              <div className="mt-3 flex flex-wrap items-center">
                <span className="font-bold text-gray-600 text-xl">${box.price}</span>
              </div>
            </div>
            <div className="p-4 border-b text-sm text-gray-700">
              <span className="flex items-center mb-1">
                <p className="mt-2 ml-1 text-m">{box.descr}</p>
              </span>    
            </div>
            <div className="p-4 border-t border-b text-sm text-gray-700">
              <span className="flex items-center mb-1">
                <i className="far fa-clock fa-fw mr-2 text-gray-900"></i> Pick-up time: {box.timeFrom} - {box.timeTo}
              </span>
              <span className="flex flex-wrap items-center">
                <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>
                <div>
                  <p className="mr-2 mb-1">
                    Total 
                  </p>
                  <p className="mr-2 mb-1">
                    reserved 
                  </p>
                  <p className="mr-2 mb-1">
                    bought 
                  </p>
                </div>
                <div>
                  <p className="px-2 mb-1 ml-1 py-1 leading-none bg-yellow-200 text-yellow-800 rounded-full">
                  {box.count} 
                  </p>
                  <p className="px-2 mb-1 ml-1 py-1 leading-none bg-yellow-200 text-yellow-800 rounded-full">
                  {box.count_reserved} 
                  </p>
                  <p className="px-2 mb-1 ml-1 py-1 leading-none bg-yellow-200 text-yellow-800 rounded-full">
                  {box.count_bought}
                  </p> 
                </div>
              </span>       
            </div>
            <div className="p-4 border-t text-sm text-gray-700">
              <button 
              onClick={editBoxInfo} 
              className="mr-4 text-m text-white  py-2 px-4 bg-gray-400 rounded font-normal hover:bg-gray-500">
                Edit
              </button>
              <button 
              onClick={()=> setShowModal(true)} 
              className="mr-14 text-m text-white  py-2 px-4 bg-red-400 rounded font-normal hover:bg-red-500">
                Delete
              </button>      
            </div>
          </div>
          {showModal
          ? <DeleteModal
            box={box}
            deleteBox={deleteBox}
            setShowModal={setShowModal}/>
          : null }
          </div>
        </div>
      </div>
    </div>
    </>
  );
};


