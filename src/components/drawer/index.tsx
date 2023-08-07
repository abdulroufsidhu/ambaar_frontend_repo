import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

export interface DrawerItem {
  path: string;
  text: string;
  icon?: ReactNode;
}

interface DrawerProps {
  drawerState: boolean;
  setDrawerState: Dispatch<SetStateAction<boolean>>;
  drawerItems: DrawerItem[];
}

const MyDrawer = ({
  drawerState,
  setDrawerState,
  drawerItems,
}: DrawerProps) => {
  const navigate = useNavigate();

  const closeDrawer = () => setDrawerState(false);

  const navigateTo = (path: string) => {
    navigate(path);
    closeDrawer();
  };

  return (
    <SwipeableDrawer
      variant="temporary"
      anchor="left"
      open={drawerState}
      onClose={() => setDrawerState(false)}
      onOpen={() => setDrawerState(true)}
      sx={{ width: drawerState ? 240 : 60 }}
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
