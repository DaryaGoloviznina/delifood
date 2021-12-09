import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { signOutThunk } from "../../../../store/user/auth/actions";

export const NavLinksUser = () => { 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="hidden sm:block sm:ml-6">
      <div className="ml-3 relative">
        <div>
          <Link to="/profile/all" 
            className="text-white px-3 py-2 rounded-md text-sm font-medium ml-4" aria-current="page">
              My Profile
          </Link>
          <Link to="/boxes" 
            className="text-white px-3 py-2 rounded-md text-sm font-medium ml-4" aria-current="page">
              Browse Boxes
          </Link>
          <button
            className="bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium ml-4" aria-current="page"
            onClick={()=> dispatch(signOutThunk(navigate))}
          >
            Signout
          </button>
        </div>
      </div>
    </div>
  )
}
