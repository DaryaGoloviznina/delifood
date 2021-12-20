import {useEffect} from "react";
import { Order } from './Order';
import { useSelector, useDispatch } from "react-redux";
import { getOrders, deleteAllOrders } from '../../../store/orders/actions';
import { useParams } from "react-router-dom";
import { RestCRMNavigation } from "../RestCRMNavigation";

export const OrderList = () => {
  const dispatch = useDispatch();
  const params = useParams();
  
  const user = useSelector((store) => (store.auth?.user));
  const arr = useSelector((store) => store.orders.orders);

  useEffect(() => {
    (async () => {
      dispatch(getOrders(params.id, user?.id));
    })();
  }, [dispatch, params.id, user]);

  function deleteAll(){
    let arrId = []
    for (let el of arr ){
      arrId.push(el.id);
    }
    dispatch(deleteAllOrders(arrId));
  }

  return (
    <div className="mt-10">
      <RestCRMNavigation 
      deleteAll={deleteAll}/>
      <div className="flex container flex-wrap mx-auto items-center justify-center py-8 dark:bg-gray-900">
        {arr.map((el) => <Order key={el.id} order={el} />)}
        { !arr.length && 
          <div className="container h-80 text-center mt-36">
            <p className="uppercase text-gray-400 font-bold">
              No Orders Yet!
            </p>
          </div>
        }
      </div>
    </div>
  );
};

