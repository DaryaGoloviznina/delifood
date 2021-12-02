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
    <div className="pt-11 flex items-center justify-center">
      <ActionButton content="User" func={changeForm}/>
      <ActionButton content="Business" func={changeForm}/>
    </div>

    <div className="pt-0 mt-10 mb-9 flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <form className="bg-gray-100 px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Sign Up</h1>
                { user && <input 
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="name"
                    placeholder="Name" />
                }

                { business && 
                  <>
                    <input 
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="name"
                    placeholder="Business Name" />

                    <input 
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="address"
                    placeholder="Address" />
                    
                    <div className="mb-3">
                    <input 
                    type="checkbox" 
                    id="chain" 
                    name="chain" 
                    className="mr-2"/>
                    <label for="chain">Are you part of a chain?</label>
                    </div>
                    </>
                }

                <input 
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="email"
                    placeholder="Email" />

                <input 
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    placeholder="Password" />
                <input 
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="confirm_password"
                    placeholder="Confirm Password" />

                <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                >Create Account</button>

                <div className="text-center text-sm text-grey-dark mt-4">
                    By signing up, you agree to the 
                    <a className="ml-1 no-underline border-b border-grey-dark text-grey-dark" href="#">
                        Terms of Service
                    </a> and 
                    <a className="ml-1 no-underline border-b border-grey-dark text-grey-dark" href="#">
                        Privacy Policy
                    </a>
                </div>
            </form>

            <div className="text-grey-dark mt-6">
                Already have an account?  
                <Link to="/auth/login">
                    Log in
                </Link>
            </div>
        </div>
      </div>
      </>
  )
}