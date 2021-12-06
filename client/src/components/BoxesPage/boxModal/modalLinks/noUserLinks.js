import { Link } from "react-router-dom";

export const NoUserLinks = () => {
  return (
    <div className="px-4 py-3 bg-gray-200 text-gray-500 text-xs font-bold uppercase rounded">
      <Link to='/auth/signup'>
        <button className="px-4 py-3 bg-green-800 text-white text-xs font-bold uppercase rounded hover:bg-green-900 mr-1">
          Sign Up
        </button>
      </Link> or 
      <Link to='/auth/login'>
        <button className="ml-1 px-4 py-3 bg-green-800 text-white text-xs font-bold uppercase rounded hover:bg-green-900 mr-1">
          Log In
        </button>
      </Link> 
      to grab this box!
    </div>
  )
}