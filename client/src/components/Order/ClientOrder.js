
import { createStrDateFromDB, convertObjTimetoStrTime } from '../../lib/formateTimeFunctions'
import { issueOrder, delOrder } from '../../store/orders/actions'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export const ClientOrder = ({order}) => {  
  const params = useParams();
  const dispatch = useDispatch();

  // async function giveOrder(){
  //   dispatch(issueOrder(order.id))
  // }
  
  async function deleteOrder(){
    // dispatch(delOrder(params.id, order.id))
  }
  
  return (
  <div >
    <p>Box: {order.box_name}</p>
    <p>Price: {order.box_price} $</p>
    <p>Count: {order.order_count} </p>
    <p>Date: {createStrDateFromDB(order.box_start_date)}</p>
    <p>Time: {convertObjTimetoStrTime(order.box_start_date)}-{convertObjTimetoStrTime(order.box_end_date)}</p>
    <p>Code: {order.order_code}</p> 
    <p>Restaurant: {order["Box.Store.name"]}</p> 
    <p>Address: {order["Box.Store.address"]}</p> 
    <p>Phone: {order["Box.Store.phone"]}</p> 
    <p>Status: {order.status}</p> 
    <p><i>created at: {`${createStrDateFromDB(order.createdAt)} ${convertObjTimetoStrTime(order.createdAt)}`}</i></p> 
   
    <button onClick={deleteOrder} className='boxbutt'>{ order.status === 'ожидает' ? 'Отменить' : 'Удалить'}</button>
  <p>------------------------------</p>
  </div>
);
};

