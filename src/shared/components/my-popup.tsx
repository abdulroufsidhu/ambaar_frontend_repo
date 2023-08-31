import { Popover, Container } from "@mui/material";

import useAppContext from "../hooks/app-context";

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
