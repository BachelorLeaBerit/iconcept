import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { FeelingList } from './components/FeelingList';
import TranslationDetails from './components/TranslationDetails';
import Translations from "./components/Translations";


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
    path: '/translation/:id',
    element: <TranslationDetails />
  },
  {
    path: '/translation/byTermOrReligion/:id/:byTerm',
    element: <Translations />
  }
];

export default AppRoutes;
