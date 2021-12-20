import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export const RestCRMNavigation = ({addNewBox, deleteAll}) => {

  const location = useLocation();
  const params = useParams();
  
  const [activeStatus, setActiveStatus] = useState(1);
  
  return (
    <div className="flex justify-center">
        <div className="sm:hidden relative w-11/12 mx-auto bg-white rounded">
            <div className="absolute inset-0 m-auto mr-4 z-0 w-6 h-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-selector" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#A0AEC0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="8 9 12 5 16 9" />
                    <polyline points="16 15 12 19 8 15" />
                </svg>
            </div>
            <select aria-label="Selected tab" className="form-select block w-full p-3 border border-gray-300 rounded text-gray-600 appearance-none bg-transparent relative z-10">
                <option className="text-sm text-gray-600">inactive </option>
                <option className="text-sm text-gray-600">inactive </option>
                <option selected className="text-sm text-gray-600">
                    Active
                </option>
                <option className="text-sm text-gray-600">inactive </option>
                <option className="text-sm text-gray-600">inactive </option>
            </select>
        </div>
        <div className="w-2/5 p-3 justify-between flex-wrap hidden sm:block bg-gray-200 shadow-xl rounded">
            <div className="xl:w-full xl:mx-0 -b pl-5 pr-5 h-12">
              <ul className="flex items-center h-full">
                <Link to={
                /boxes/.test(location.pathname) 
                ? "/crm/boxes/active"
                : "/crm/orders/active"}>
                  <li onClick={() => setActiveStatus(1)} className={activeStatus == 1 ? "text-m text-green-700 py-2 px-4 bg-white rounded mr-8 font-normal" : "text-m text-gray-600 py-3 mr-10 font-normal hover:text-green-700 cursor-pointer"}>
                    Active
                  </li>
                </Link>
                <Link to={
                /boxes/.test(location.pathname)
                ? "/crm/boxes/picked"
                : "/crm/orders/picked"}>
                  <li onClick={() => setActiveStatus(2)} className={activeStatus == 2 ? "text-m text-green-700 py-2 px-4 bg-white mr-8 rounded font-normal" : "text-m text-gray-600 py-3 mr-10 font-normal hover:text-green-700 cursor-pointer"}>
                    Picked Up
                  </li>
                </Link>
                <Link to={
                /boxes/.test(location.pathname)
                ? "/crm/boxes/expired"
                : "/crm/orders/expired"}>
                  <li onClick={() => setActiveStatus(3)} className={activeStatus == 3 ? "mr-14 text-m text-green-700 py-2 px-4 bg-white rounded font-normal" : "mr-14 text-m text-gray-600 py-3  font-normal hover:text-green-700 cursor-pointer"}>
                    Expired
                  </li>
                </Link>
                {/boxes/.test(location.pathname) &&
                  <li 
                  onClick={addNewBox} className="ml-16 cursor-pointer text-m text-white py-2 px-4 bg-green-600 hover:bg-green-700 rounded font-normal">
                    + Add box
                  </li>}
                {/orders/.test(location.pathname) && params.id !== 'active' &&
                  <li 
                  onClick={deleteAll} className="ml-16 cursor-pointer text-m text-red-600 py-2 px-4 bg-red-300 hover:bg-red-700 rounded font-normal">
                    Delete All 
                  </li>
                }
              </ul>
            </div>
        </div>
    </div>
  );
};

