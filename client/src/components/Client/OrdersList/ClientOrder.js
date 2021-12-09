
import { createStrDateFromDB, convertObjTimetoStrTime } from '../../../lib/formateTimeFunctions'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { delClientOrder } from '../../../store/orders/actions'


export const ClientOrder = ({order}) => {  
  const params = useParams();
  const dispatch = useDispatch();

  
  async function deleteOrder(){
    dispatch(delClientOrder(order.status, order.id))
  }
  
  return (
  <div >
    <p>Box: {order.box_name}</p>
    <p>Price: {order.box_price * order.order_count} $</p>
    <p>Count: {order.order_count} </p>
    <p>Date: {createStrDateFromDB(order.box_start_date)}</p>
    <p>Time: {convertObjTimetoStrTime(order.box_start_date)}-{convertObjTimetoStrTime(order.box_end_date)}</p>
    <p>Code: {order.order_code}</p> 
    <p>Restaurant: {order["Box.Store.name"]}</p> 
    <p>Address: {order["Box.Store.address"]}</p> 
    <p>Phone: {order["Box.Store.phone"]}</p> 
    <p>Status: {order.status}</p> 
    <p><i>created at: {`${createStrDateFromDB(order.createdAt)} ${convertObjTimetoStrTime(order.createdAt)}`}</i></p> 
    <button onClick={deleteOrder} className='boxbutt'>{ order.status === 'Pending Pick Up' ? 'Отменить' : 'Удалить'}</button>
  <p>------------------------------</p>
  </div>
);
};

