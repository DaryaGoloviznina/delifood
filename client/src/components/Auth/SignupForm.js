import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { ActionButton } from '../Buttons/ActionButton'

export const SignupForm = () => {

  const [user, setUser] = useState(true);
  const [business, setBusiness] = useState(false);

  const changeForm = () => {
    setUser(!user);
    setBusiness(!business);
  }

  console.log('business=>', business)
  console.log('user=>>', user)

  // const router = useRouter()
  
  return (
    <>
    <div className="pt-11 mt-5 flex items-center justify-center">
      <ActionButton content="User" func={changeForm}/>
      <ActionButton content="Business" func={changeForm}/>
    </div>

    <div className="flex items-center mt-11 mb-20">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img className="object-cover w-full h-full" 
            src="https://source.unsplash.com/user/erondu/1600x900"
              alt="img" />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <div className="flex justify-center">
                <img src="https://img.icons8.com/office/40/000000/broccoli.png"/>
              </div>
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                Sign Up
              </h1>
                { user && <>
                  <div className="mt-4">
                    <p className="text-sm text-center text-gray-500">
                      Register to get your mystery box and support our mission 
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm">
                      Username
                    </label>
                    <input type="text"
                      name="name"
                      className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                      placeholder="Username" />
                  </div>
                </>
                }
                { business && 
                  <>
                  <div className="mt-4">
                    <p className="text-sm text-center text-gray-500">
                      Register to start creating your mystery box and help get our planet waste-free
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm">
                      Business Name
                    </label>
                    <input type="text"
                      name="name"
                      className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                      placeholder="Business Name" />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm">
                      Address
                    </label>
                    <input type="text"
                      name="address"
                      className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                      placeholder="Address" />
                  </div>
                  <div className="mt-4">
                    <input 
                    type="checkbox" 
                    id="chain" 
                    name="chain" 
                    className="mr-2"/>
                    <label for="chain" 
                    className="text-sm">
                      Are you part of a chain?
                    </label>
                  </div>
                  </>
                  }
                {/* </div> */}
              <div className="mt-4">
                <label className="block text-sm">
                  Email
                </label>
                <input type="email"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                  placeholder="Email Address" />
              </div>
              <div>
                <label className="block mt-4 text-sm">
                  Password
                </label>
                <input
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                  placeholder="Password" 
                  type="password" />
              </div>
              <div>
                <label className="block mt-4 text-sm">
                  Confirm Password
                </label>
                <input
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                  placeholder="Confirm Password" 
                  type="confirm_password" />
              </div>
              <button
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue"
                href="#">
                Sign Up
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm">Already have an account?
                  <Link to="/auth/login">
                    <a className="ml-1 text-green-600 hover:underline"> 
                      Log In.
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}