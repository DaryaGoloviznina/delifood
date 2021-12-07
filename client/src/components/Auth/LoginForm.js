import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { authUserThunk } from '../../store/user/auth/actions.js'

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    dispatch(authUserThunk({email, password, navigate}));
  }
  
  return (
    <div className="flex items-center min-h-screen bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img className="object-cover w-full h-full" 
            src="https://images.unsplash.com/photo-1564759224907-65b945ff0e84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="img" />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form 
            className="w-full"
            onSubmit={authUser}>
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
                <input 
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Email Address" />
              </div>
              <div>
                <label className="block mt-4 text-sm">
                  Password
                </label>
                <input
                  name="password"
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Password" 
                  type="password" />
              </div>
              <button
                type="submit"
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-blue"
                >
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
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}