import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { getClientOrders } from '../../../store/orders/actions'
import { ClientOrder } from './ClientOrder'

export const ClientOrdersList = () => {  
  const params = useParams();
  const user = useSelector((store) => (store.auth?.user));
  const dispatch = useDispatch();

  useEffect(()=>{(async()=> {
    dispatch(getClientOrders(params.id, user))
  })()
  }, [dispatch, user, params.id]); 

  
  const arr = useSelector((store) => (store.orders.orders));

  console.log(arr)
  return (
  <div className="flex items-center justify-center py-8 dark:bg-gray-900">

    {arr.map((el) => <ClientOrder key={el.id} order={el}/>)}
  </div>
);
};
