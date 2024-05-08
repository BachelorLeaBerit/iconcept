import Home from "./components/Term/Home/Home";
import TranslationDetails from "./components/Term/Home/Tables/TranslationDetailsTable";
import SuggestTranslation from "./components/Term/SuggestNew/SuggestTranslation"
import EditTranslation from "./components/Term/SuggestEdit/EditTranslation";
import ApproveSuggestions from "./components/Term/Approve/ApproveSuggestions";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import Admin from "./components/Auth/Admin/Admin";
import LogoutButton from "./components/Auth/Logout/Logout";
import Profile from "./components/Auth/Profile/Profile";
import EditUserRoleModal from "./components/Auth/Admin/EditRoleModal";
import { HomeOldSearch } from "./components/Term/Home/HomeOldSearch";
import OldHomeComp from "./components/Term/Home/OldHomeComp";

const AppRoutes = [
  {
    index: true,
    element: <Home/>
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
  {
    path: '*',
    element: <div>Siden eksisterer ikke.</div>
  }
  
];

export default AppRoutes;
