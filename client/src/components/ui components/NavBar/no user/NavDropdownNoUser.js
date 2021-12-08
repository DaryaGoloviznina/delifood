import { Link } from "react-router-dom";

export const NavDropdownNoUser = () => {
  return (
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/auth/login" className=" text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">
            Log In
          </Link>

          <Link to="/auth/signup" className=" text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">
            Sign Up
          </Link>
        </div>
      </div>
  )
}

