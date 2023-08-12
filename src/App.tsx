import "./index.css";
import { ItemsRouting } from "./screens/item";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import MyDrawer, { DrawerItem } from "./screens/drawer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthRoutes } from "./screens/auth";
import { BusinessRoutes } from "./screens/business/router";
import {
  BusinessCenterOutlined,
  LocalGroceryStoreOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import useAppContext from "./shared/hooks/app-context";
import { MyAppBar } from "./shared/components/appbar";
import { useEffect, useMemo, useState } from "react";
import { MyPopup } from "./shared/components/my-popup";
import { MyDrawerConstants } from "./shared/constants";
import { MyProgressIndicator } from "./shared/components/progress-indicator";
import { BusinessList } from "./screens/business";
import { Business, IBusiness } from "./shared/models/business";

function App() {
  const [context, dispatch] = useAppContext();
  const location = useLocation();
  const [businesses, setBusinesses] = useState<IBusiness[]>(() => []);

  useEffect(() => {
    Business.list()
      .then((list) => setBusinesses(list ?? []))
      .catch((error) => console.error(error));
    return () => setBusinesses([]);
  }, [context.navigate]);

  const drawerItems: Array<DrawerItem> = useMemo(() => {
    if (!context.user?._id) {
      return [
        {
          icon: <SecurityOutlined />,
          path: "/",
          text: "Auth",
        },
      ];
    } else {
      context.navigate && context.navigate("/items", { replace: true });
      return [
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
    }
  }, [context.user]);

  useEffect(() => {
    !context.popupState && dispatch({ action: "CLOSE_POPUP" });
  }, [context.popupState]);

  return (
    <>
      <ThemeProvider theme={context.theme!}>
        <CssBaseline />
        <MyProgressIndicator />
        <MyDrawer drawerItems={drawerItems} />
        <MyAppBar color="default" open={context.drawerState}>
          <Toolbar
            sx={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "space-between",
            }}
            variant="regular"
          >
            <Typography
              variant="h3"
              component="div"
              sx={{ marginLeft: 2 }}
              onClick={() =>
                !!context.navigate && context.navigate("/", { replace: true })
              }
              className="unselectable"
            >
              {import.meta.env.VITE_APP_NAME}
            </Typography>

            {!!context.user && <BusinessList list={businesses} />}
          </Toolbar>
        </MyAppBar>

        <Box
          sx={{
            marginLeft: `${
              context.drawerState
                ? MyDrawerConstants.width.max
                : MyDrawerConstants.width.min
            }`,
            width: `calc(100% - ${
              context.drawerState
                ? MyDrawerConstants.width.max
                : MyDrawerConstants.width.min
            })`,
          }}
        >
          {(!location.pathname.match("/") ||
            !location.pathname.match("/signup")) &&
            !context.user?._id && <Navigate to="/" replace />}
          <Routes>
            <Route path="/*" element={<AuthRoutes />} />
            {!!context.user?._id && (
              <>
                <Route path="items/*" element={<ItemsRouting />} />
                <Route path="businesses/*" element={<BusinessRoutes />} />
              </>
            )}
          </Routes>
        </Box>

        <MyPopup />
      </ThemeProvider>
    </>
  );
}

export default App;
