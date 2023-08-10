import { JSXElementConstructor, ReactNode, createContext, useContext, useReducer } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';



interface ApplicationContext {
  navigate?: NavigateFunction;
  popupState?: boolean;
  popupChild?: ReactNode;
  drawerState?: boolean;
  darkMode?: boolean;
}

interface ApplicationContextAction {
  action?: string;
  payload: ApplicationContext;
}

const initialState: ApplicationContext = {
  navigate: undefined,
  popupState: false,
  popupChild: null,
  drawerState: false,
  darkMode: false,
};

function appContextReducer(state: ApplicationContext, action: ApplicationContextAction): ApplicationContext {
  switch (action.action) {
    case 'SET_NAVIGATE':
      return { ...state, navigate: action.payload.navigate };
    case 'SET_POPUP_STATE':
      return { ...state, popupState: action.payload.popupState };
    case 'SET_POPUP_CHILD':
      return { ...state, popupChild: action.payload.popupChild };
    case 'SET_DRAWER_STATE':
      return { ...state, drawerState: action.payload.drawerState };
    case 'SET_DARK_MODE':
      return { ...state, darkMode: action.payload.darkMode };
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
  const [state, dispatch] = useReducer(appContextReducer, initialState);
  return <AppContext.Provider value={ [state, dispatch] }> { children } < /AppContext.Provider>;
}

export default useAppContext