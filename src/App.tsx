import "./index.css";
import { ItemsRouting } from "./components/item";
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
import MyDrawer, { DrawerItem } from "./components/drawer";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { AuthRoutes } from "./components/auth";
import axios from "axios";
import { Constants } from "./shared/Constants";
import { User } from "./shared/models/user";
import { BusinessRoutes } from "./components/business/router";
import {
  BusinessCenterOutlined,
  ChevronLeftOutlined,
  LocalGroceryStoreOutlined,
  Menu,
  SecurityOutlined,
} from "@mui/icons-material";

function App() {
  axios.defaults.baseURL = Constants.baseUrl;
  axios.defaults.headers["Content-Type"] = "application/json";

  axios.interceptors.request.use(
    (success) => success,
    (error) => console.warn(error)
  );

  const navigate = useNavigate();
  const [drawerState, setDrawerState] = useState(false);
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

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
    () => createTheme({ palette: { mode: darkMode ? "dark" : "light" } }),
    [darkMode]
  );

  const handleProfileImageClick = () => {
    User.logout();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <MyDrawer
          drawerItems={drawerItems}
          drawerState={drawerState}
          setDrawerState={setDrawerState}
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
                onClick={() => navigate(-1)}
              >
                <ChevronLeftOutlined />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                onClick={() => navigate("/")}
                className="unselectable"
              >
                {import.meta.env.VITE_APP_NAME}
              </Typography>
              <Link onClick={handleProfileImageClick}>
                <Avatar
                  src={`https://ui-avatars.com/api/?name=${
                    User.getInstance()?.person?.name ?? ""
                  }`}
                ></Avatar>
              </Link>

              <Switch
                value={darkMode}
                onChange={() => setDarkMode((v) => !v)}
              />
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setDrawerState((state) => !state)}
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
