import { useEffect } from 'react';
import { useRoutes } from 'react-router';
import { useDispatch } from 'react-redux';
import { LoginForm } from './components/Auth/LoginForm';
import { Navigate } from 'react-router';
import { SignupForm } from './components/Auth/SignupForm';
import { Footer } from './components/Footer';
import Home from './components/Home/Home';
import { RestMap } from './components/Map/Map';
import { Nav } from './components/NavBar/Nav';
import { checkUserThunk } from './store/auth/actions'

const routes = [
  {
    path: '/',
    element: <Navigate to='/home'/>,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/auth/login', 
    element: <LoginForm />
  },
  {
    path: '/auth/signup', 
    element: <SignupForm  />
  },
  {
    path: '/map',
    element: <RestMap />
  },
]

function App() {
  const content = useRoutes(routes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserThunk(42));
  }, [])

  return (
    <div className="App">
      <Nav />
        {content}
      <Footer />
    </div>
  );
}

export default App;
