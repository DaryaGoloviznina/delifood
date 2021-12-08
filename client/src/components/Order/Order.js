
import { createStrDateFromDB, convertObjTimetoStrTime } from '../../lib/formateTimeFunctions'
import { issueOrder, delOrder } from '../../store/orders/actions'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export const Order = ({order}) => {  
  const params = useParams();
  const dispatch = useDispatch();

  async function giveOrder(){
    dispatch(issueOrder(order.id))
  }
  
  async function deleteOrder(){
    dispatch(delOrder(params.id, order.id))
  }
  
  return (
  <div className='card'>
    <p>Сustomer: {order.client_name}</p>
    <p>Сustomer's phone: {order.client_phone}</p>
    <p>Order code: {order.order_code}</p>
    <p>------------------------------</p>
    <p>Box Info</p>
    <p>Box name: {order.box_name}</p>
    <p>Count: {order.order_count} </p>
    <p>Price: {order.box_price * order.order_count}$</p>
    <p>Date: {createStrDateFromDB(order.box_start_date)}</p>
    <p>Time: {convertObjTimetoStrTime(order.box_start_date)}-{convertObjTimetoStrTime(order.box_end_date)}</p>
    <p>------------------------------</p>
    <p><i>created at: {`${createStrDateFromDB(order.createdAt)} ${convertObjTimetoStrTime(order.createdAt)}`}</i></p>
    { params.id === 'active' && <button onClick={giveOrder} className='boxbutt'>Picked up</button> }
    <button onClick={deleteOrder} className='boxbutt'>Delete</button>
  </div>
);
};
