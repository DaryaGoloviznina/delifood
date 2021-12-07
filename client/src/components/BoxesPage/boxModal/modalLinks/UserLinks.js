import { Link } from "react-router-dom";

export const UserLinks = ({boxData}) => {
  return (
    <form className="flex">
      <input 
      className="mr-2 px-3 py-2 rounded text-gray-600 focus:outline-none outline-none"
      type="number" 
      name="quantity" 
      min="1" 
      placeholder={boxData.count}
      max={boxData.count}/>
      <button className="px-4 py-3 bg-green-800 text-white text-xs font-bold uppercase rounded hover:bg-green-900">Reserve Box</button>
    </form>
  )
}