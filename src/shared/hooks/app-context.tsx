import axios from 'axios';
import { ReactNode, createContext, useContext, useReducer } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ServerUrls } from '../constants';
import { IBranch } from '../models/branch';
import { IBusiness } from '../models/business';
import { IUser } from '../models/user';
import { Theme, createTheme } from '@mui/material';

interface ApplicationContext {
  navigate?: NavigateFunction;
  popupState?: boolean;
  popupChild?: ReactNode;
  drawerState?: boolean;
  darkMode?: boolean;
  branch?: IBranch;
  business?: IBusiness;
  theme?: Theme;
  user?: IUser;
}

type ContextActions = "SET_NAVIGATE"
  | "SET_POPUP_STATE"
  | "SET_POPUP_CHILD"
  | "SET_DRAWER_STATE"
  | "SET_DARK_MODE"
  | "SET_USER"
  | "SET_BRANCH"
  | "CLEAR_BRANCH"
  | "SET_BUSINESS"
  ;

interface ApplicationContextAction {
  action?: ContextActions
  payload?: ApplicationContext;
}

function appContextReducer(state: ApplicationContext, action: ApplicationContextAction): ApplicationContext {
  switch (action.action) {
    case 'SET_NAVIGATE':
      return { ...state, navigate: action.payload?.navigate };
    case 'SET_POPUP_STATE':
      return { ...state, popupState: action.payload?.popupState };
    case 'SET_POPUP_CHILD':
      return { ...state, popupChild: action.payload?.popupChild };
    case 'SET_DRAWER_STATE':
      return { ...state, drawerState: action.payload?.drawerState };
    case 'SET_DARK_MODE':
      return {
        ...state,
        theme: createTheme({ palette: { mode: action.payload?.darkMode ? "dark" : "light" } }),
        darkMode: action.payload?.darkMode
      };
    case 'SET_BRANCH':
      return { ...state, branch: action.payload?.branch };
    case 'CLEAR_BRANCH':
      return { ...state, branch: undefined };
    case 'SET_BUSINESS':
      return { ...state, business: action.payload?.business };
    case 'SET_USER':
      return { ...state, user: action.payload?.user };
    default:
      return state;
  }
}

const AppContext = createContext<[ApplicationContext, React.Dispatch<ApplicationContextAction>] | undefined>(undefined);

function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  const nav = useNavigate()
  const [state, dispatch] = useReducer(appContextReducer, {
    navigate: nav,
    popupState: false,
    popupChild: null,
    drawerState: false,
    darkMode: false,
    theme: createTheme({ palette: { mode: "light" } })
  });

  axios.defaults.baseURL = ServerUrls.baseUrl;
  axios.defaults.headers["Content-Type"] = "application/json";

  axios.interceptors.request.use(
    (success) => success,
    (error) => console.warn(error)
  );

  return (<AppContext.Provider value={[state, dispatch]}> {children} </AppContext.Provider>);
}

export default useAppContext;