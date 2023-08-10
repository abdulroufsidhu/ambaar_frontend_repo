import "./index.css";
import { ItemsRouting } from "./screens/item";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  IconButton,
  Link,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import MyDrawer, { DrawerItem } from "./screens/drawer";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { AuthRoutes } from "./screens/auth";
import axios from "axios";
import { ServerUrls } from "./shared/constants";
import { User } from "./shared/models/user";
import { BusinessRoutes } from "./screens/business/router";
import {
  BusinessCenterOutlined,
  ChevronLeftOutlined,
  LocalGroceryStoreOutlined,
  Menu,
  SecurityOutlined,
} from "@mui/icons-material";
import useAppContext from "./shared/hooks/app";
import { ThemeSwitch } from "./shared/components/buttons";

function App() {
  axios.defaults.baseURL = ServerUrls.baseUrl;
  axios.defaults.headers["Content-Type"] = "application/json";

  axios.interceptors.request.use(
    (success) => success,
    (error) => console.warn(error)
  );

  const [context, contextDispatch] = useAppContext()

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
  // Update the theme only if the mode changes
  const theme = React.useMemo(
    () => createTheme({ palette: { mode: context.darkMode ? "dark" : "light" } }),
    [context.darkMode]
  );

  const handleProfileImageClick = () => {
    User.logout();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <MyDrawer
          drawerItems={drawerItems}
        />

        <CssBaseline />

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar variant="regular">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="back"
                sx={{ mr: 2 }}
                onClick={() => (!!context.navigate) && context.navigate(-1)}
              >
                <ChevronLeftOutlined />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                onClick={() => (!!context.navigate) && context.navigate("/", { replace: true })}
                className="unselectable"
              >
                {import.meta.env.VITE_APP_NAME}
              </Typography>
              <Link onClick={handleProfileImageClick}>
                <Avatar
                  src={`https://ui-avatars.com/api/?name=${User.getInstance()?.person?.name ?? ""}`}
                ></Avatar>
              </Link>

              <ThemeSwitch
                value={context.darkMode}
                onChange={() => contextDispatch({ payload: { darkMode: !context.darkMode } })}

              />
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => contextDispatch({ payload: { drawerState: true } })}
              >
                <Menu />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/*" element={<AuthRoutes />} />
          <Route path="items/*" element={<ItemsRouting />} />
          <Route path="businesses/*" element={<BusinessRoutes />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
