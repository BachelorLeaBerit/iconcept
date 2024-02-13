import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { FeelingList } from './components/FeelingList';
import { Register } from "./components/Register";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/feelings',
    element: <FeelingList />,
  },
  {
    path: '/register',
    element: <Register />,
  }
];

export default AppRoutes;
