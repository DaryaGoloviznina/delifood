
import { createStrDateFromDB, convertObjTimetoStrTime } from '../../../lib/formateTimeFunctions'
import { issueOrder, delOrder } from '../../../store/orders/actions'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export const Order = ({order}) => {  
  const params = useParams();
  const dispatch = useDispatch();

  async function giveOrder(){
    dispatch(issueOrder(order.id));
  }
  
  async function deleteOrder(){
    dispatch(delOrder(params.id, order.id));
  }
  
  return (
  <>
    <div className="w-96 mb-8 mr-5 cursor-pointer rounded-md shadow-xl bg-white dark:bg-gray-800 relative">
      <div className="py-5 h-1/2 rounded-md relative pb-36 overflow-hidden">
        <img 
        className="absolute inset-0 rounded-l h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1529003600303-bd51f39627fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"/>
      </div>
      <div className="py-5">
        <div className="flex items-center w-full">
          <div className="flex px-6 w-2/5 mb-3">
              <p className=" px-2 py-2 text-gray-400 rounded-full text-sm leading-none  text-gray-800 dark:text-gray-100 mt-1">
                Order By @{order.client_name}
              </p>
          </div>
          <div className="flex px-6 w-2/5 mb-3">
              <p className="text-center text-gray-400 rounded-full text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">
                Contact Number: {order.client_phone}
              </p>
          </div>
        </div>

        <div className="pt-3 flex justify-between relative items-center w-full">
            <div className="w-3 h-5  dark:bg-gray-400 rounded-r-3xl" />
            <div className="w-full border-b-2 border-dashed border-gray-100 dark:border-gray-400" />
            <div className="w-3 h-5  dark:bg-gray-400 rounded-l-3xl" />
        </div>
        
        <div className="flex items-center w-full">
          <div className="mt-5 px-6">
          <p className="text-xs text-gray-400">Box</p>
            <p className="text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">{order.box_name}</p>
          </div>
          <div className="mt-5 px-6 ml-10">
              <p className="text-xs text-gray-400">Amount Ordered</p>
              <p className=" text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">{order.order_count}</p>
          </div>
        </div>

        <div className="flex items-center w-full">
          <div className="mt-5 px-6">
              <p className="text-xs text-gray-400">Pick Up Time</p>
              <p className="text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">{convertObjTimetoStrTime(order.box_start_date)}-{convertObjTimetoStrTime(order.box_end_date)}</p>
          </div>
          <div className="mt-5 px-6">
            <p className="text-xs text-gray-400">Date</p>
            <p className="text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">{createStrDateFromDB(order.box_start_date)}</p>
          </div>
        </div>
        <div className="flex items-center w-full">
            <div className="mt-5 px-6">
                <p className="text-xs text-gray-400">Total</p>
                <p className="px-2 py-1  bg-yellow-200 text-yellow-800 rounded-full text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">${order.box_price * order.order_count}</p>
            </div>
        </div>
        <div className="mt-5 px-6">
        { params.id === 'active' && 
          <button 
          onClick={giveOrder} 
          className="px-3 py-2 bg-green-500 text-white rounded-full text-sm leading-none text-justify dark:text-gray-100 mt-1">
            Picked up
          </button> }
          <button 
          onClick={deleteOrder}
          className="ml-3 px-3 py-2 bg-red-200 text-red-600 rounded-full text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">
            Delete
          </button>
        </div>
        <div className="pt-6 flex justify-between relative items-center w-full">
            <div className="w-3 h-5  dark:bg-gray-400 rounded-r-3xl" />
            <div className="w-full border-b-2 border-dashed border-gray-100 dark:border-gray-400" />
            <div className="w-3 h-5  dark:bg-gray-400 rounded-l-3xl" />
        </div>
        <div className="mt-4 px-6 flex flex-col w-full justify-center items-center">
            <img src="https://cdn.tuk.dev/assets/templates/virtual-event-management/barCode.png" alt="barcode" />
            <p className="text-sm font-bold leading-none text-gray-700 dark:text-gray-400 mt-2">{order.order_code}</p>
        </div>
      </div>
    </div>
    </>
);
};
