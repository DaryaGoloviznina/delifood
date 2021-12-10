import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const UserLinks = ({boxData, reserveBox, clientOrderBoxAmount, setOrderPrice}) => {

  const user = useSelector((store) => (store.auth?.user));
  
  function changePrice(e){
    console.log(e.target.value)
    setOrderPrice(Math.abs(Number(e.target.value)*boxData.price))
  }

  return (
    <>
    <form 
    onSubmit={reserveBox} 
    className="flex">
      <input 
      className="mr-2 px-3 py-2 rounded text-gray-600 focus:outline-none outline-none"
      type="number" 
      name="quantity" 
      min="1" 
      defaultValue={1} 
      placeholder={clientOrderBoxAmount}
      onChange={changePrice}
      max={clientOrderBoxAmount}/>
      <button type="submit" className="px-4 py-3 bg-green-800 text-white text-xs font-bold uppercase rounded hover:bg-green-900">Reserve Box</button>
    </form>
    </>
  )
}
