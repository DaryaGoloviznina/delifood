import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { NavDropdownNoUser } from './no user/NavDropdownNoUser';
import { NavLinksNoUser } from './no user/NavLinksNoUser';

export const Nav = () => {

  const user = useSelector((store) => (store?.user));

  return (
    <>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        {/* <script src="http://api-maps.yandex.ru/2.1/?apikey=a9e98eaf-d4c4-45e6-9ee4-5afad392d357&lang=ru_RU" type="text/javascript"
        >
        </script> */}
        {/* <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=a9e98eaf-d4c4-45e6-9ee4-5afad392d357" type="text/javascript"></script> */}
      </head>
      <nav className="bg-green-800 pt-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* logo */}
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <span className="font-medium text-white hover:text-gray-900 text-3xl font-extrabold">
                  DeliFood
                </span>
              </div>
            </div>
            {!user 
            ? <NavLinksNoUser/>
            : <input/>
            }
          </div>
          {/* drop down menu */}
          {!user 
          ? <NavDropdownNoUser />
          : <input/>
          }
        </div>
      </nav>
    </>
  )
}





