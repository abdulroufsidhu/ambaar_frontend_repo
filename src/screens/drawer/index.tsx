import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Theme,
  styled,
  CSSObject,
  IconButton,
  Drawer,
  Divider,
} from "@mui/material";
import { ReactNode } from "react";
import useAppContext from "../../shared/hooks/app-context";
import { ChevronLeftOutlined, LogoutOutlined, Menu } from "@mui/icons-material";
import { ThemeSwitch } from "../../shared/components/buttons";
import {User} from "../../shared/models/user";
import { ClientUrls } from "../../shared/routes";

export interface DrawerItem {
  path: string;
  text: string;
  icon?: ReactNode;
}

export const MyDrawerConstants = {
  width: {
    min: "80px",
    max: "240px",
  },
};

interface DrawerProps {
  drawerItems: DrawerItem[];
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: MyDrawerConstants.width.max,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `${MyDrawerConstants.width.min}`,
  [theme.breakpoints.up("sm")]: {
    width: `${MyDrawerConstants.width.min}`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  flexDirection: "row",
  flexWrap: "wrap",
  marginBlock: "1rem",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const MyCustomDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: MyDrawerConstants.width.max,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


const MyDrawer = ({ drawerItems }: DrawerProps) => {
  const [context, dispatch] = useAppContext();
  const user = User.getInstance();

  const toggleDrawer = (state: boolean) =>
    dispatch({ action: "SET_DRAWER_STATE", payload: { drawerState: state } });

  const navigateTo = (path: string) => {
    !!context.navigate && context.navigate(path);
    toggleDrawer(false);
  };

  return (
    <MyCustomDrawer
      variant="permanent"
      open={context.drawerState}
      onClose={() => {
        toggleDrawer(false);
      }}
    >
      <DrawerHeader>
        <IconButton onClick={() => toggleDrawer(!context.drawerState)}>
          {context.drawerState ? <ChevronLeftOutlined /> : <Menu />}
        </IconButton>
      </DrawerHeader>
      <List key="drawer.list">
        <ListItem key={`drawer-theme-button-list-item`}>
          <ThemeSwitch
            key={`drawer-theme-button-switch-list-item`}
            checked={context.darkMode}
            onChange={() => dispatch({ action: "TOGGLE_THEME" })}
          />

          <ListItemText
            key={`drawer-theme-buttons-list-item-button-text`}
            primary="Toggle Theme"
            onClick={() => dispatch({ action: "TOGGLE_THEME" })}
          />
        </ListItem>
        {drawerItems.map((item) => (
          <>
            <ListItem key={`drawer-${item.path}-list-item`}>
              <ListItemButton
                key={`drawer-${item.path}-list-item-button`}
                onClick={() => navigateTo(item.path)}
              >
                {!!item.icon && (
                  <ListItemIcon
                    key={`drawer-${item.path}-list-item-button-icon`}
                  >
                    {item.icon}
                  </ListItemIcon>
                )}

                <ListItemText
                  key={`drawer-${item.path}-list-item-button-text`}
                  primary={item.text}
                />
              </ListItemButton>
            </ListItem>
          </>
        ))}
        {user?._id && (
          <>
            <Divider />
            <ListItem key={`drawer-logout-button-list-item`}>
              <ListItemButton
                key={`drawer-logout-button-list-item-button`}
                onClick={() => {
                  User.logout()
                    .then(() => {
                      !!context.navigate &&
                        context.navigate(ClientUrls.baseUrl);
                        dispatch({action: "CLEAR_BUSINESS"})
                    })
                    .catch((error) => console.error(error));
                }}
              >
                <ListItemIcon
                  key={`drawer-logout-button-list-item-button-icon`}
                >
                  <LogoutOutlined key="drawer-logout-button-list-item-button-icon-icon" />
                </ListItemIcon>

                <ListItemText
                  key={`drawer-logout-button-list-item-button-text`}
                  primary="Logout"
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </MyCustomDrawer>
  );
};

export default MyDrawer;
