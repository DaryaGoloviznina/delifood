import {useEffect} from "react";
import { Order } from '../Order/Order';
import { useSelector, useDispatch } from "react-redux";
import { getOrders, deleteAllOrders } from '../../store/orders/actions';
import { Link, useParams } from "react-router-dom";


export const OrderList = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    (async () => {
      dispatch(getOrders(params.id))
    })();
  }, [dispatch, params.id]);

  const arr = useSelector((store) => store.orders.orders);

  function deleteAll(){
    let arrId = []
    for (let el of arr ){
      arrId.push(el.id)
    }
    dispatch(deleteAllOrders(arrId))
  }

  return (
    <div>
      Заказы
      
      <ul class="flex bg-green-700 h-16 items-center">
      <li class="mr-6">
      <Link className="text-blue-50 hover:text-green-900" to="/crm/orders/active">Active</Link>
      </li>
      <li class="mr-6">
      <Link className="text-blue-50 hover:text-green-900" to="/crm/orders/picked">Picked Up</Link>
      </li>
      <li class="mr-6">
      <Link className="text-blue-50 hover:text-green-900" to="/crm/orders/expired">Expired</Link>
      </li>
      </ul>
      {  params.id !== 'active' && <button onClick={deleteAll}>DELETE ALL</button> }
    {arr.map((el)=> <Order key={el.id} order={el} />)}
    
    </div>
  );
};

