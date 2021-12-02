import { Link } from "react-router-dom";

export const NavLinksNoUser = () => {

  return (
    <div className="hidden sm:block sm:ml-6">
      <div className="ml-3 relative">
        <div>
          <button type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
          </button>
            <Link to="/auth/signup" className="bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">
                Signup
            </Link>
            <Link to="/auth/login" className="bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium ml-4" aria-current="page">
                Login
            </Link>
        </div>
      </div>
    </div>

  )
}





