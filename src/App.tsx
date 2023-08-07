import ItemsRouting from "./components/item/ItemsRouting";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import MyDrawer, { DrawerItem } from "./components/drawer";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import React from "react";
import AuthRoutes from "./components/auth/AuthRoutes";

function App() {
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  const drawerItems = useMemo(() => {
    const drawerItems: DrawerItem[] = [
      {
        icon: "",
        path: "/auth/signup",
        text: "Home",
      },
      {
        icon: "",
        path: "/items",
        text: "Items",
      },
    ];
    return drawerItems;
  }, []);

  // Update the theme only if the mode changes
  const theme = React.useMemo(
    () => createTheme({ palette: { mode: darkMode ? "dark" : "light" } }),
    [darkMode]
  );

  const [drawerState, setDrawerState] = useState(false);

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
              <div>
                <Switch
                  value={darkMode}
                  onChange={() => setDarkMode((v) => !v)}
                />
              </div>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="auth/*" element={<AuthRoutes />} />
          <Route path="items/*" element={<ItemsRouting />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
