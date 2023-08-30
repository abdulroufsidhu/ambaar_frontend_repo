import "./index.css";
import { ItemsRouting } from "./screens/inventory";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import MyDrawer, { DrawerItem, MyDrawerConstants } from "./screens/drawer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthRoutes } from "./screens/auth";
import {
  AssessmentOutlined,
  GroupOutlined,
  LocalGroceryStoreOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import useAppContext from "./shared/hooks/app-context";
import { MyAppBar } from "./shared/components/appbar";
import { useEffect, useMemo, useState } from "react";
import { MyPopup } from "./shared/components/my-popup";
import { MyProgressIndicator } from "./shared/components/progress-indicator";
import { BusinessList } from "./screens/business";
import { EmployeeRoutes } from "./screens/employee";
import { User } from "./shared/models/user";
import { ClientUrls, ServerUrls } from "./shared/routes";
import { OperationRouting } from "./screens/operation/routes";

function App() {
  const [context, dispatch] = useAppContext();
  const location = useLocation();
  const user = User.getInstance();

  const drawerItems: Array<DrawerItem> = useMemo(() => {
    if (!user?._id) {
      return [
        {
          icon: <SecurityOutlined />,
          path: ClientUrls.baseUrl,
          text: ClientUrls.auth.login,
        },
      ];
    } else {
      context.navigate &&
        context.navigate(ClientUrls.inventory.base, { replace: true });
      return [
        {
          icon: <LocalGroceryStoreOutlined />,
          path: ClientUrls.inventory.base,
          text: "Products",
        },
        {
          icon: <GroupOutlined />,
          path: ClientUrls.employee.base,
          text: "Employee",
        },
        {
          icon: <AssessmentOutlined />,
          path: ClientUrls.operations.base + ClientUrls.operations.list,
          text: "Operations",
        },
      ];
    }
  }, [user]);

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
                !!context.navigate &&
                context.navigate(ClientUrls.baseUrl, { replace: true })
              }
              className="unselectable"
            >
              {import.meta.env.VITE_APP_NAME}
            </Typography>

            {!!user && <BusinessList />}
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
          {(!location.pathname.match(ClientUrls.baseUrl) ||
            !location.pathname.match("/signup")) &&
            !user?._id && <Navigate to={ClientUrls.baseUrl} replace />}
          <Routes>
            <Route path="/*" element={<AuthRoutes />} />
            {!!user?._id && (
              <>
                <Route
                  path={`${ClientUrls.inventory.base}*`}
                  element={<ItemsRouting />}
                />
                <Route
                  path={`${ClientUrls.employee.base}*`}
                  element={<EmployeeRoutes />}
                />
                <Route
                  path={`${ClientUrls.operations.base}*`}
                  element={<OperationRouting />}
                />
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
