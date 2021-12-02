import { useRoutes } from 'react-router';
import { LoginForm } from './components/Auth/LoginForm';
import { SignupForm } from './components/Auth/SignupForm';
import { Footer } from './components/Footer';
import Home from './components/Home/Home';
import { RestMap } from './components/Map/Map';
import { Nav } from './components/NavBar/Nav';

const routes = [
  {
    path: '/',
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

  return (
    <div className="App">
      <Nav />
        {content}
      <Footer />
    </div>
  );
}

export default App;
