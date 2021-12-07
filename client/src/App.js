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
import { RestCRM } from './components/RestCRM/RestCRM';
import { checkUserThunk } from './store/user/auth/actions'
import { OrderList } from "./components/OrderList/OrderList";
import { Profile } from './components/profile/Profile';
import { BoxesPage } from './components/Boxes/BoxesPage';

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
  {
    path: '/crm/boxes/:id',
    element: <RestCRM />
  },
  {
    path: '/crm/orders/:id',
    element: <OrderList />

  },
  
  {
    path: '/profile',
    element: <Profile />

  },
  {
    path: '/boxes',
    element: <BoxesPage />
  },
]

function App() {
  const content = useRoutes(routes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserThunk());
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
