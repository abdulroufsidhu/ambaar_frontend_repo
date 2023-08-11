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
} from "@mui/material";
import { ReactNode } from "react";
import useAppContext from "../../shared/hooks/app-context";
import { ChevronLeftOutlined, Menu } from "@mui/icons-material";
import { MyDrawerConstants } from "../../shared/constants";

export interface DrawerItem {
  path: string;
  text: string;
  icon?: ReactNode;
}

interface DrawerProps {
  drawerItems: DrawerItem[];
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: MyDrawerConstants.width.max,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `${MyDrawerConstants.width.min}`,
  [theme.breakpoints.up('sm')]: {
    width: `${MyDrawerConstants.width.min}`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const MyCustomDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: MyDrawerConstants.width.max,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const MyDrawer = ({
  drawerItems,
}: DrawerProps) => {
  const [context, dispatch] = useAppContext()

  const toggleDrawer = (state: boolean) => dispatch({ action: "SET_DRAWER_STATE", payload: { drawerState: state } });

  const navigateTo = (path: string) => {
    (!!context.navigate) && context.navigate(path);
    toggleDrawer(false)
  };

  console.info(drawerItems)

  return (
    <MyCustomDrawer
      variant="permanent"
      open={context.drawerState}
      onClose={() => { toggleDrawer(false) }}
    >
      <DrawerHeader>
        <IconButton onClick={() => toggleDrawer(!context.drawerState)}>
          {context.drawerState ? <ChevronLeftOutlined /> : <Menu />}
        </IconButton>
      </DrawerHeader>
      <List>
        {drawerItems.map((item, index) => (
          <>
            <ListItem key={`${index}-list-item`}>
              <ListItemButton
                key={`${index}-list-item-button`}
                onClick={() => navigateTo(item.path)}
              >
                {!!item.icon && (
                  <ListItemIcon key={`${index}-list-item-button-icon`}>
                    {item.icon}
                  </ListItemIcon>
                )}

                <ListItemText
                  key={`${index}-list-item-button-text`}
                  primary={item.text}
                />
              </ListItemButton>
            </ListItem>
          </>
        ))}
      </List>
    </MyCustomDrawer>
  );
};

export default MyDrawer;
