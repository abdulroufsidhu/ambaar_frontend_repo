import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { ReactNode } from "react";
import useAppContext from "../../shared/hooks/app";

export interface DrawerItem {
  path: string;
  text: string;
  icon?: ReactNode;
}

interface DrawerProps {
  drawerItems: DrawerItem[];
}

const MyDrawer = ({
  drawerItems,
}: DrawerProps) => {
  const [context, dispatch] = useAppContext()

  const closeDrawer = () => dispatch({ payload: { drawerState: false } });
  const openDrawer = () => dispatch({ payload: { drawerState: true } });

  const navigateTo = (path: string) => {
    (!!context.navigate) && context.navigate(path);
    closeDrawer();
  };

  return (
    <SwipeableDrawer
      variant="temporary"
      anchor="right"
      open={context.drawerState}
      onClose={closeDrawer}
      onOpen={openDrawer}
      sx={{ width: context.drawerState ? 240 : 60 }}
    >
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
    </SwipeableDrawer>
  );
};

export default MyDrawer;
