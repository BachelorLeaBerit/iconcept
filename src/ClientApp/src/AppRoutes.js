import Home from "./components/UserPages/Home";
import TranslationDetails from './components/UserPages/TranslationDetails';
import SuggestTranslation from "./components/UserPages/SuggestTranslation";
import EditTranslation from "./components/UserPages/EditTranslation";
import ApproveSuggestions from "./components/EditorPages/ApproveSuggestions";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import AdminPanel from "./components/Auth/Admin/Admin";
import LogoutButton from "./components/Auth/LogoutButton";
import Profile from "./components/Auth/Profile";
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
    element: <AdminPanel />,
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
