import { ItemsRouting } from "./components/item";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
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
import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import { AuthRoutes } from "./components/auth";
import axios from "axios";
import { Constants } from "./shared/Constants";
import { User } from "./shared/models/user";

function App() {
  axios.defaults.baseURL = Constants.baseUrl;
  axios.defaults.headers["Content-Type"] = "application/json";

  axios.interceptors.request.use(
    (success) => success,
    (error) => console.warn(error)
  );

  const [drawerState, setDrawerState] = useState(false);
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  const drawerItems = [];
  if (!User.getInstance()) {
    drawerItems[0] = {
      icon: "",
      path: "/",
      text: "Auth",
    };
  } else {
    drawerItems[0] = {
      icon: "",
      path: "/items",
      text: "Items",
    };
  }
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
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setDrawerState((state) => !state)}
              >
                📕
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/*" element={<AuthRoutes />} />
          <Route path="items/*" element={<ItemsRouting />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
