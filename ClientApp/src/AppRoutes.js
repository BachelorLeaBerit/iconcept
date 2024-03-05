import { Home } from "./components/UserPages/Home";
import TranslationDetails from './components/UserPages/TranslationDetails';
import Translations from "./components/UserPages/Translations";
import SuggestTranslation from "./components/UserPages/SuggestTranslation";
import EditTranslation from "./components/UserPages/EditTranslation";
import ApproveSuggestions from "./components/EditorPages/ApproveSuggestions";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/translation/:id',
    element: <TranslationDetails />
  },
  {
    path: '/suggestTranslation',
    element: <SuggestTranslation />
  },
  {
    path: '/editTranslation/:id',
    element: <EditTranslation />
  },
  {
    path: '/approveSuggestions',
    element: <ApproveSuggestions />
  }
];

export default AppRoutes;
