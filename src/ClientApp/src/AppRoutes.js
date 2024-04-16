import Home from "./components/User/Home/Home";
import TranslationDetails from "./components/Tables/TranslationDetailsTable"
import SuggestTranslation from "./components/User/Suggestion/SuggestTranslation"
import EditTranslation from "./components/User/EditTranslation/EditTranslation";
import ApproveSuggestions from "./components/Auth/Editor/ApproveSuggestions";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import Admin from "./components/Auth/Admin/Admin";
import LogoutButton from "./components/Auth/Logout/Logout";
import Profile from "./components/Auth/Profile/Profile";
import EditUserRoleModal from "./components/Auth/Admin/EditRoleModal";

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
  },
  {
  path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/logout',
    element: <LogoutButton />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/editUserRole',
    element: <EditUserRoleModal />,
  },
  
];

export default AppRoutes;
