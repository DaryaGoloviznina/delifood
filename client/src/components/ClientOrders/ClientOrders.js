
// import { createStrDateFromDB, convertObjTimetoStrTime } from '../../lib/formateTimeFunctions'
// import { issueOrder, delOrder } from '../../store/orders/actions'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { setActiveOrdersAC } from '../../store/orders/actions'
import { ClientOrder } from '../Order/ClientOrder'

export const ClientOrders = () => {  
  const params = useParams();
  const user = useSelector((store) => (store.auth?.user));
  const dispatch = useDispatch();

  useEffect(()=>{(async()=> {
    let request = await fetch(`/client/orders/${params.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user?.id,
      }),
    });
    let response = await request.json();
    response = response.map((el)=>{
      if (new Date(el.box_end_date) > new Date() && el.picked_up === false) {
         el.status = 'ожидает';
         return el
      } else if (new Date(el.box_end_date) < new Date() && el.picked_up === false){
        el.status = 'не получен';
         return el
      } else {
        el.status = 'получен';
         return el
      }
    })
    dispatch(setActiveOrdersAC(response))
    
  })()
  }, [dispatch, user, params.id]); 

  // async function giveOrder(){
  //   dispatch(issueOrder(order.id))
  // }
  const arr = useSelector((store) => (store.orders.orders));
  // async function deleteOrder(){
  //   dispatch(delOrder(params.id, order.id))
  // }
  console.log(arr)
  return (
  <div >
    ТУТ БУДУТ ЗАКАЗЫ {params.id}
    {arr.map((el) => <ClientOrder order={el}/>)}
  </div>
);
};
