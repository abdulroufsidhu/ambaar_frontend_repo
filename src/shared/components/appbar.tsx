import { styled, AppBar } from "@mui/material";
import { MyDrawerConstants } from "../constants";
import { AppBarProps } from "@mui/material/AppBar"

interface Props extends AppBarProps {
  open?: boolean;
}

export const MyAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<Props>(({ theme, open }) => ({
  position: "relative",
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `${MyDrawerConstants.width.min}`,
  width: `calc(100% - ${MyDrawerConstants.width.min})`,
  ...(open && {
    marginLeft: `${MyDrawerConstants.width.max} `,
    width: `calc(100% - ${MyDrawerConstants.width.max})`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
