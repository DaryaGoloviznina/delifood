import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { useRoutes } from 'react-router';
import { ActionButton } from '../Buttons/ActionButton'

export const LoginForm = () => {

  
  return (
    <div className="flex items-center min-h-screen bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img className="object-cover w-full h-full" src="https://source.unsplash.com/user/erondu/1600x900"
              alt="img" />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <div className="flex justify-center">
                <img src="https://img.icons8.com/office/40/000000/broccoli.png"/>
              </div>
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                Log In
              </h1>
              <div className="mt-4">
                <label className="block text-sm">
                  Email
                </label>
                <input type="email"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Email Address" />
              </div>
              <div>
                <label className="block mt-4 text-sm">
                  Password
                </label>
                <input
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Password" type="password" />
              </div>
              <button
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue"
                href="#">
                Log In
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm">Don't have an account yet?
                  <Link to="/auth/signup">
                    <a className="ml-1 text-green-600 hover:underline"> 
                      Sign up.
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}