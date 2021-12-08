import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { signOutThunk } from "../../../../store/user/auth/actions";

export const NavDropdownUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link to="/auth/login" className=" text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">
          My Cart
        </Link>

        <Link to="/auth/signup" className=" text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">
          My Profile
        </Link>
        <button
          className="bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium ml-4" aria-current="page"
          onClick={()=> dispatch(signOutThunk(navigate))}>
            Signout
        </button>
      </div>
    </div>
  )
}

