
// import { createStrDateFromDB, convertObjTimetoStrTime } from '../../lib/formateTimeFunctions'
// import { issueOrder, delOrder } from '../../store/orders/actions'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { setActiveOrdersAC } from '../../../store/orders/actions'
import { ClientOrder } from './ClientOrder'

export const ClientOrdersList = () => {  
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
        el.status = 'Pending Pick Up';
        return el
      } else if (new Date(el.box_end_date) < new Date() && el.picked_up === false){
        el.status = 'Picked up';
        return el
      } else {
        el.status = 'Expired';
        return el
      }
    })
    dispatch(setActiveOrdersAC(response))
    
  })()
  }, [dispatch, user, params.id]); 

  
  const arr = useSelector((store) => (store.orders.orders));

  console.log(arr)
  return (
  <div className="flex items-center justify-center py-8 dark:bg-gray-900">
    {/* ТУТ БУДУТ ЗАКАЗЫ {params.id} */}
    {arr.map((el) => <ClientOrder order={el}/>)}
  </div>
);
};
