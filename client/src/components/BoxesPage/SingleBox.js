import { useState, useEffect, useContext } from "react";
import Context from '../../context';

import { useSelector } from "react-redux";
import { convertObjTimetoStrTime } from "../../lib/formateTimeFunctions";
import { calculateDistance } from '../../lib/distance'
import { getBoxAmount } from "../../lib/getBoxAmount";

export const Box = ({boxData}) => {
  const {
    id,
    store_img,
    name,
    descr,
    price,
    start_date,
    end_date,
    store_name,
    store_lat,
    store_lon,
  } = boxData;

  const { modalBoxHandler}  = useContext(Context);
  const [boxAmount, SetBoxAmount] = useState(getBoxAmount(boxData))
  const [distance, setDistance] = useState(0);
  
  const location = useSelector((store) => (store.auth?.location));

  //-------calculating distacne from current location to the restaurant 
  useEffect(() => {
    if (location !== null) setDistance(
      calculateDistance(
        {latitude: location.lat, longitude: location.lon}, 
        {latitude: store_lat, longitude: store_lon}
      ).toFixed(1)
    )
  }, [location]);

  //--------------formats time data from DB to readable string
  const startTime = convertObjTimetoStrTime(start_date);
  const endTime = convertObjTimetoStrTime(end_date);

  if (boxAmount === 0) return null // deleteing the box from the page

  return (
    <div
      key={id}
      className="antialiased bg-gray-100 text-gray-900 font-sans p-6">
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        <div className="w-96">
          <div 
            className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden cursor-pointer"
            onClick={() => modalBoxHandler({...boxData, startTime, endTime, boxAmount, SetBoxAmount})}
          >
            <div className="relative pb-48 overflow-hidden">
              <img 
                className="absolute inset-0 h-full w-full object-cover" 
                src={store_img} 
                alt="restaurant image"
              />
            </div>
            <div className="p-4">
              <span 
                className="px-2 py-1 leading-none bg-yellow-200 text-yellow-800 rounded-full font-semibold uppercase tracking-wide text-xs"
              >
                {store_name}
              </span>
              <h2 className="mt-2 mb-2  font-bold">{name}</h2>
              <p className="text-sm">{descr}</p>
              <div className="mt-3 flex flex-wrap items-center">
                <span className="font-bold text-xl">${price}</span>
              </div>
            </div>
            <div className="p-4 border-t border-b text-sm text-gray-700">
              <span className="flex items-center mb-1">
                <i className="far fa-clock fa-fw mr-2 text-gray-900"></i> 
                Pick-up time: {startTime} - {endTime}
              </span>
              <span className="flex items-center">
                <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>
                Distance: {distance} km
              </span> 
              <span className="flex items-center">
                <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>
                Left in stock: {boxAmount}
              </span>       
            </div>
            <div className="p-4 flex items-center text-sm text-gray-600"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-gray-400"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><span className="ml-2">{store_name}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
