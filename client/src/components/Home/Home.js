import { LinkButton } from '../Buttons/LinkButton'
import { Footer } from '../Footer'
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <Link to="/">
                        <span className="font-medium text-green-800 hover:text-gray-900 text-3xl font-extrabold">
                          DeliFood
                        </span>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block md:ml-20 md:pr-4 md:space-x-8 justify-end">
                  <Link to="/auth/signup" className="font-medium text-gray-500 hover:text-gray-900">
                      Sign up
                  </Link>
                  <Link to="/auth/login" className="font-medium text-green-500 hover:text-green-700">
                      Log in
                  </Link>
                </div>
              </nav>
            </div>
            {/* scaled menu */}
            <div className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                  <span className="font-medium text-green-800 hover:text-gray-900 text-3xl font-extrabold">
                    DeliFood
                  </span>
                  </div>
                  <div className="-mr-2">
                    {/* menu close button */}
                    <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link to="/auth/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                      Sign Up
                  </Link>

                  <Link to="/auth/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                      Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Let's battle </span>
                  <span className="block text-green-500 xl:inline"> food waste together</span>
                </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Get a mystery box through DeliFood and help us get our planet free of food-waste step by step. Just log in, browse and get amazing food from your local restaurants. Did we mention great savings?
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <LinkButton content="Search boxes" link="/stores"/>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="img/food-stock.jpg" alt=""/>
      </div>
    </div>
    {/* <Footer/> */}
    </>

  )
}
