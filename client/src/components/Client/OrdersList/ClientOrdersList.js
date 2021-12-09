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

  return (
    <div className="flex container flex-wrap mx-auto items-center justify-center py-8 dark:bg-gray-900">
      {arr.map((el) => <ClientOrder order={el}/>)}
      { !arr.length && 
        <div className="container h-80 text-center mt-36">
          <p className="uppercase text-gray-400 font-bold">
            No boxes were found 
          </p>
        </div>
      }
    </div>
  );
};
