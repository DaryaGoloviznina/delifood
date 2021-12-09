import { useState, useEffect } from "react";
import BoxModal from "../ui components/Modals/CustomerBoxesPage/BoxModal";

export const Box = ({el, setEndOrderModal}) => {
  const {
    id, 
    store_img,
    store_name,
    name,
    descr,
    count,
    count_reserved,
    count_bought,
    price,
    start_date,
    end_date,
    store_lon,
    store_lat } = el;

    const box_amount = count - count_reserved - count_bought;

    const [showModal, setShowModal] = useState(false);
    const [boxData, setBoxdata] = useState({});
    const [clientOrderBoxAmount, setclientOrderBoxAmount] = useState(box_amount) // для изменения количества оставшихся боксов в ресторане после оформления заказа клиента

  

    //--------------formats time data from DB to readable string
    const convertObjTimetoStrTime = (obj) => {
      let hours = new Date(obj).getHours();
      if (hours < 10) hours = '0' + hours;

      let minutes = new Date(obj).getMinutes();
      if (minutes < 10) minutes = '0' + minutes;

      return `${hours}:${minutes}`;
    }

    const startTime = convertObjTimetoStrTime(start_date);
    const endTime = convertObjTimetoStrTime(end_date);

    //---------------activates modal and gathers data for it
    const modalHandler = () => {
      setBoxdata({
        id, 
        store_img,
        store_name,
        name,
        descr,
        box_amount,
        price,
        startTime,
        endTime,
        store_lon,
        store_lat
      });
      setShowModal(true);
    }

  if (clientOrderBoxAmount === 0) return null // удаление бокса со страницы 

  return (
    <div
    key={id}
    className="antialiased bg-gray-100 text-gray-900 font-sans p-6">
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        <div className="w-96">
          <div 
          className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden cursor-pointer"
          onClick={modalHandler}
          >
            <div className="relative pb-48 overflow-hidden">
              <img className="absolute inset-0 h-full w-full object-cover" src={store_img} alt="restaurant image"/>
            </div>
            <div className="p-4">
              <span className="px-2 py-1 leading-none bg-yellow-200 text-yellow-800 rounded-full font-semibold uppercase tracking-wide text-xs">{store_name}</span>
              <h2 className="mt-2 mb-2  font-bold">{name}</h2>
              <p className="text-sm">{descr}</p>
              <div className="mt-3 flex flex-wrap items-center">
                <span className="font-bold text-xl">${price}</span>
              </div>
            </div>
            <div className="p-4 border-t border-b text-sm text-gray-700">
              <span className="flex items-center mb-1">
                <i className="far fa-clock fa-fw mr-2 text-gray-900"></i> Pick-up time: {startTime} - {endTime}
              </span>
              <span className="flex items-center">
                <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>Distance:
              </span> 
              <span className="flex items-center">
                <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>Left in stock: {clientOrderBoxAmount}
              </span>       
            </div>
            <div className="p-4 flex items-center text-sm text-gray-600"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-gray-400"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><span className="ml-2">{store_name}</span></div>
          </div>
          {showModal ? (
            <BoxModal
            showModal={showModal}
            setShowModal={setShowModal}
            boxData={boxData} 
            clientOrderBoxAmount={clientOrderBoxAmount}
            setclientOrderBoxAmount={setclientOrderBoxAmount}
            setEndOrderModal={setEndOrderModal}/>
          ) : null}
        </div>
      </div>
    </div>
  </div>
  )
}
