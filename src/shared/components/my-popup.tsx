import { Popover, Container, AppBar, Button, Dialog, Divider, IconButton, List, ListItem, ListItemText, Slide, Toolbar, Typography } from "@mui/material";

import useAppContext from "../hooks/app-context";
import React, { ReactNode, useRef } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { ChevronLeft, CloseFullscreenOutlined, CloseRounded, SkipPrevious } from "@mui/icons-material";

export const MyPopup = () => {
  const [context, dispatch] = useAppContext();
  const handlePopoverClose = () => {
    dispatch({ action: "CLOSE_POPUP" });
  };
  return (
    <Popover
      sx={{
        maxHeight: "80vh"
      }}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      onClose={handlePopoverClose}
      open={context.popupState!}
    >
      <Container sx={{ padding: 4 }}>{context.popupChild}</Container>
    </Popover>
  );
};


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface MyFullScreenDialogProps {
  open: boolean;
  title?: string;
  children?: ReactNode;
  actions?: ReactNode[];
  handleClose?: () => void;
}

export default function MyFullScreenDialog({open, title, children, actions, handleClose} : MyFullScreenDialogProps) {

  

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <ChevronLeft />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title && title}
            </Typography>
            {actions?.map(action=>action && action)}
          </Toolbar>
        </AppBar>
        {children}
      </Dialog>
    </React.Fragment>
  );
}


