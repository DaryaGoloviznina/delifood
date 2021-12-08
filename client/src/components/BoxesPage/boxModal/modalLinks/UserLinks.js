import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const UserLinks = ({boxData, reserveBox}) => {

  const user = useSelector((store) => (store.auth?.user));
  

  // function reserveBox(e){
  //   e.preventDefault();
  //   console.log(boxData) //взять id бокса и id user 
  //   console.log(user)
  //   console.log('RESERVE')
  // }

  return (
    <>
    <form className="flex">
      <input 
      className="mr-2 px-3 py-2 rounded text-gray-600 focus:outline-none outline-none"
      type="number" 
      name="quantity" 
      min="1" 
      placeholder={boxData.count}
      max={boxData.count}/>
      <button onClick={reserveBox} className="px-4 py-3 bg-green-800 text-white text-xs font-bold uppercase rounded hover:bg-green-900">Reserve Box</button>
    </form>
    </>
  )
}
