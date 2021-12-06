import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link , useNavigate} from "react-router-dom";
import { ActionButton } from '../Buttons/ActionButton'
import { registerUserThunk } from '../../store/auth/actions.js'

export const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userButton, setUser] = useState(true);
  const [businessButton, setBusiness] = useState(false);

  const changeForm = () => {
    setUser(!userButton);
    setBusiness(!businessButton);
  }

  const registerUser = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const address = event.target.address?.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirm_password = event.target.confirm_password.value;
    // const phone = event.target.number.value;
    if (password === confirm_password){
      dispatch(registerUserThunk({name, address, email, password, navigate}));
    } else {
      alert('passwords do not match');
    }
  }
  
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
            <form 
            className="w-full"
            onSubmit={registerUser}>
              <div className="flex justify-center">
                <img src="https://img.icons8.com/office/40/000000/broccoli.png"
                alt="broccoli"/>
              </div>
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                Sign Up
              </h1>
              { userButton && <>
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
              { businessButton && 
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
                {/* <div className="mt-4">
                  <label className="block text-sm">
                    Contact Number
                  </label>
                  <input type="text"
                    name="number"
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                    placeholder="Contact Number" />
                </div> */}
                </>
                }
              <div className="mt-4">
                <label className="block text-sm">
                  Email
                </label>
                <input 
                  type="email"
                  name="email"
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
                  name="password"
                  type="password" />
              </div>
              <div>
                <label className="block mt-4 text-sm">
                  Confirm Password
                </label>
                <input
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-green-200 focus:outline-none focus:ring-1 focus:ring-green-200"
                  placeholder="Confirm Password" 
                  name="confirm_password"
                  type="password" />
              </div>
              <button
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue"
                type="submit">
                Sign Up
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm">
                  Already have an account?
                  <Link to="/auth/login">
                    <a className="ml-1 text-green-600 hover:underline"> 
                      Log In.
                    </a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}