import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { NavDropdownBusiness } from './business/NavDropdownBusiness';
import { NavLinksBusiness } from './business/NavLinksBusiness';
import { NavDropdownNoUser } from './no user/NavDropdownNoUser';
import { NavLinksNoUser } from './no user/NavLinksNoUser';
import { NavDropdownUser } from './user/NavDropDownUser';
import { NavLinksUser } from './user/NavLinksUser';

export const Nav = () => {
  const location = useLocation();

  const user = useSelector((store) => (store.auth?.user));

  return (
    !/home/.test(location.pathname) &&
    <nav className="bg-green-800 pt-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-medium text-white hover:text-gray-900 text-3xl font-extrabold">
                DeliFood
              </span>
            </div>
          </div>
          {!user &&
            <NavLinksNoUser />
          }
          { user && !user?.address &&
            <NavLinksUser />
          }
          { user?.address &&
            <NavLinksBusiness />
          }
        </div>
        {!user &&
          <NavDropdownNoUser />
        }
        { user && !user?.address &&
          <NavDropdownUser />
        }
        { user?.address &&
          <NavDropdownBusiness />
        }
      </div>
    </nav>
  )
}
