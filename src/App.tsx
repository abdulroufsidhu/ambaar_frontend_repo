import "./index.css";
import { ItemsRouting } from "./screens/item";
import { ThemeProvider, styled } from "@mui/material/styles";
import {
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MyDrawer, { DrawerItem } from "./screens/drawer";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "./screens/auth";
import { BusinessRoutes } from "./screens/business/router";
import {
  BusinessCenterOutlined,
  LocalGroceryStoreOutlined,
  Menu,
  SecurityOutlined,
} from "@mui/icons-material";
import useAppContext from "./shared/hooks/app-context";
import { ThemeSwitch } from "./shared/components/buttons";
import { MyAppBar } from "./shared/components/appbar";

const drawerItems: Array<DrawerItem> = [
  {
    icon: <SecurityOutlined />,
    path: "/",
    text: "Auth",
  },
  {
    icon: <LocalGroceryStoreOutlined />,
    path: "/items",
    text: "Items",
  },
  {
    icon: <BusinessCenterOutlined />,
    path: "/businesses",
    text: "Businesses",
  },
];


function App() {

  const [context, dispatch] = useAppContext()


  return (
    <>
      <ThemeProvider theme={context.theme!}>
        <CssBaseline />
        <MyDrawer
          drawerItems={drawerItems}
        />
        <MyAppBar open={context.drawerState}>
          <Toolbar variant="regular">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              onClick={() => (!!context.navigate) && context.navigate("/", { replace: true })}
              className="unselectable"
            >
              {import.meta.env.VITE_APP_NAME}
            </Typography>
            <ThemeSwitch
              value={context.darkMode}
              onChange={() => dispatch({ action: "SET_DARK_MODE", payload: { darkMode: !context.darkMode } })}
            />
          </Toolbar>
        </MyAppBar>

        <Routes>
          <Route path="/*" element={<AuthRoutes />} />
          <Route path="items/*" element={<ItemsRouting />} />
          <Route path="businesses/*" element={<BusinessRoutes />} />
        </Routes>
      </ThemeProvider >
    </>
  );
}

export default App;
