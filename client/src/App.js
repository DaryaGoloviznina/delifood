import { useEffect } from 'react';
import { useRoutes } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from './components/Auth/LoginForm';
import { Navigate } from 'react-router';
import { SignupForm } from './components/Auth/SignupForm';
import { Footer } from './components/ui components/Footer/Footer';
import Home from './components/Home/Home';
import { RestMap } from './components/ui components/Map/Map';
import { Nav } from './components/ui components/NavBar/Nav';
import { MainPageCRM } from './components/RestCRM/MainPageCRM';
import { checkUserThunk } from './store/user/auth/actions'
import { OrderList } from "./components/RestCRM/OrdersList/OrderList";
import { Profile } from './components/ui components/profile/Profile';
import { BoxesPage } from './components/BoxesPage/BoxesPage';
import { ClientOrdersList } from './components/Client/OrdersList/ClientOrdersList'
import { getAllCuisinesThunk } from '../src/store/boxes/actions';

//---------creating array of all routes 
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
    element: <MainPageCRM />
  },
  {
    path: '/crm/orders/:id',
    element: <OrderList />
  },
  {
    path: '/profile',
    element: <Profile />,
    children: [
      {
        path: ':id',
        element: <ClientOrdersList />
      }
    ]
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
    dispatch(getAllCuisinesThunk());
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
