import axios from "axios";
import { ReactNode, createContext, useContext, useReducer } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ServerUrls } from "../constants";
import { IBranch } from "../models/branch";
import { IBusiness } from "../models/business";
import { IUser } from "../models/user";
import { Theme, createTheme } from "@mui/material";
import { IEmployee } from "../models/employee";

interface ApplicationContext {
  navigate?: NavigateFunction;
  popupState?: boolean;
  popupChild?: ReactNode;
  drawerState?: boolean;
  darkMode?: boolean;
  branch?: IBranch;
  business?: IBusiness;
  theme?: Theme;
}

type ContextActions =
  | "SET_NAVIGATE"
  | "OPEN_POPUP"
  | "CLOSE_POPUP"
  | "SET_DRAWER_STATE"
  | "SET_THEME_DARK"
  | "SET_THEME_LIGHT"
  | "TOGGLE_THEME"
  | "SET_BRANCH"
  | "CLEAR_BRANCH"
  | "SET_BUSINESS";

interface ApplicationContextAction {
  action?: ContextActions;
  payload?: ApplicationContext;
}

function appContextReducer(
  state: ApplicationContext,
  action: ApplicationContextAction
): ApplicationContext {
  switch (action.action) {
    case "SET_NAVIGATE":
      return { ...state, navigate: action.payload?.navigate };
    case "OPEN_POPUP":
      return {
        ...state,
        popupChild: action.payload?.popupChild,
        popupState: true,
      };
    case "CLOSE_POPUP":
      return { ...state, popupChild: <></>, popupState: false };
    case "SET_DRAWER_STATE":
      return { ...state, drawerState: action.payload?.drawerState };
    case "SET_THEME_DARK":
      return {
        ...state,
        theme: createTheme({
          palette: { mode: "dark" },
        }),
        darkMode: true,
      };
    case "SET_THEME_LIGHT":
      return {
        ...state,
        theme: createTheme({
          palette: { mode: "light" },
        }),
        darkMode: false,
      };
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: createTheme({
          palette: { mode: state.darkMode ? "light" : "dark" },
        }),
        darkMode: !state.darkMode,
      };
    case "SET_BRANCH":
      return { ...state, branch: action.payload?.branch };
    case "CLEAR_BRANCH":
      return { ...state, branch: undefined };
    case "SET_BUSINESS":
      return { ...state, business: action.payload?.business };
    default:
      return state;
  }
}

const AppContext = createContext<
  [ApplicationContext, React.Dispatch<ApplicationContextAction>] | undefined
>(undefined);

function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  const nav = useNavigate();
  const [state, dispatch] = useReducer(appContextReducer, {
    navigate: nav,
    popupState: false,
    popupChild: null,
    drawerState: false,
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    theme: createTheme({
      palette: {
        mode: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      },
    }),
  });

  axios.defaults.baseURL = ServerUrls.baseUrl;
  axios.defaults.headers["Content-Type"] = "application/json";

  axios.interceptors.request.use(
    (success) => success,
    (error) => console.warn(error)
  );

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {" "}
      {children}{" "}
    </AppContext.Provider>
  );
}

export default useAppContext;
