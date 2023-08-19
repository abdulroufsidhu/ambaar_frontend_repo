import "./index.css";
import { ItemsRouting } from "./screens/inventory";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import MyDrawer, { DrawerItem } from "./screens/drawer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthRoutes } from "./screens/auth";
import {
  GroupOutlined,
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
import { IBusiness } from "./shared/models/business";
import { IBranch } from "./shared/models/branch";
import { EmployeeRoutes } from "./screens/employee";
import { User } from "./shared/models/user";

function App() {
  const [context, dispatch] = useAppContext();
  const location = useLocation();
  const [businesses, setBusinesses] = useState<IBusiness[]>(() => []);
  const user = User.getInstance();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const b = user?.jobs
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ?.filter((job) => !!job.branch)
      .map(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (job) => !!job.branch && ((job.branch as IBranch).business as IBusiness)
      );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setBusinesses(b ?? []);
    return () => setBusinesses([]);
  }, [user?.jobs]);

  const drawerItems: Array<DrawerItem> = useMemo(() => {
    if (!user?._id) {
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
          path: "/products",
          text: "Products",
        },
        {
          icon: <GroupOutlined />,
          path: "/employee",
          text: "Employee",
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
                !!context.navigate && context.navigate("/", { replace: true })
              }
              className="unselectable"
            >
              {import.meta.env.VITE_APP_NAME}
            </Typography>

            {!!user && <BusinessList list={businesses} />}
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
            !user?._id && <Navigate to="/" replace />}
          <Routes>
            <Route path="/*" element={<AuthRoutes />} />
            {!!user?._id && (
              <>
                <Route path="products/*" element={<ItemsRouting />} />
                <Route path="employee/*" element={<EmployeeRoutes />} />
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
