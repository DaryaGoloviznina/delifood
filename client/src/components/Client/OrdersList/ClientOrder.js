import { createStrDateFromDB, convertObjTimetoStrTime } from '../../../lib/formateTimeFunctions'
import { useDispatch } from "react-redux";
import { delClientOrder } from '../../../store/orders/actions'

export const ClientOrder = ({order}) => {  
  const dispatch = useDispatch();
  
  async function deleteOrder(){
    dispatch(delClientOrder(order.status, order.id))
  }
  
  return (
    <>
    <div className="w-96 mb-8 mr-5 cursor-pointer rounded-md shadow-xl bg-white dark:bg-gray-800 relative">
      <div className="py-5 h-1/2 rounded-md relative pb-36 overflow-hidden">
        <img 
        className="absolute inset-0 rounded-l h-full w-full object-cover"
        src={order["Box.Store.store_img"]}/>
      </div>
      <div className="py-5">
          <div className="flex px-6 w-2/5 mb-3">
              <p className="text-center px-2 py-2 bg-yellow-200 text-yellow-800 rounded-full text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">{order["Box.Store.name"]}</p>
          </div>
          <div className="px-6">
              <p className="text-xs text-gray-400">Box</p>
              <p className="text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">{order.box_name}</p>
          </div>
          
            <div className="mt-5 px-6">
                <p className="text-xs text-gray-400">Address</p>
                <p className="text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">{order["Box.Store.address"]}</p>
            </div>

          <div className="flex items-center w-full">
            <div className="mt-5 px-6">
                <p className="text-xs text-gray-400">Amount Ordered</p>
                <p className=" text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">{order.order_count}</p>
            </div>
            <div className="mt-5 px-6">
                <p className="text-xs text-gray-400">Phone</p>
                <p className="text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">{order["Box.Store.phone"]}</p>
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
              <div className="mt-5 px-6">
                  <p className="text-xs text-gray-400">Status</p>
                  <p className="px-2 py-1  bg-gray-200 text-gray-300 rounded-full text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">{order.status}</p>
              </div>
          </div>
          <div className="mt-5 px-6">
            <button 
            onClick={deleteOrder}
            className="px-3 py-2 bg-red-200 text-red-600 rounded-full text-sm leading-none text-justify text-gray-800 dark:text-gray-100 mt-1">
              { order.status === 'Pending Pick Up' ? 'Cancel Order' : 'Delete'}
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

