import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { useRoutes } from 'react-router';
import { ActionButton } from '../Buttons/ActionButton'

export const LoginForm = () => {

  
  return (
    <>
    <div className="pt-0 mt-10 mb-9 flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form className="bg-gray-100 px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Log In</h1>
            <input 
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email" />
            <input 
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password" 
            />
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
            >Create Account</button>

            {/* <div className="text-center text-sm text-grey-dark mt-4">
                By loging up, you agree to the 
                <a className="ml-1 no-underline border-b border-grey-dark text-grey-dark" href="#">
                    Terms of Service
                </a> and 
                <a className="ml-1 no-underline border-b border-grey-dark text-grey-dark" href="#">
                    Privacy Policy
                </a>
            </div> */}
        </form>

        <div className="text-grey-dark mt-6">
            Don't have an account?  
            <Link to="auth/signup" className="ml-1 no-underline border-b border-blue text-blue">
                Sign up
            </Link>
        </div>
      </div>
    </div>
    </>
  )
}