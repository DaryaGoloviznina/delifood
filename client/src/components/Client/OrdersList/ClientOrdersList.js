import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { getClientOrders, setActiveOrdersAC } from '../../../store/orders/actions'
import { ClientOrder } from './ClientOrder'

export const ClientOrdersList = () => {  
  const params = useParams();
  const user = useSelector((store) => (store.auth?.user));
  const dispatch = useDispatch();

  //-------getting client's orders
  useEffect(() => {
    dispatch(getClientOrders(params.id, user));

    return () => dispatch(setActiveOrdersAC([]));
  }, [dispatch, user, params.id]); 
  
  const orders = useSelector((store) => (store.orders.orders));

  return (
    <div className="flex container flex-wrap mx-auto items-center justify-center py-8 dark:bg-gray-900">
      {orders.map((el) => <ClientOrder order={el}/>)}
      { !orders.length && 
        <div className="container h-80 text-center mt-36">
          <p className="uppercase text-gray-400 font-bold">
            No orders were found 
          </p>
        </div>
      }
    </div>
);
};
