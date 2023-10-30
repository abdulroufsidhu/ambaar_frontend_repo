import { Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export const AuthScreen = () => {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="end"
      margin={4}
    >
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={0}
      >
        <Typography variant="h3">Welcome to ambaar!</Typography>
        <Outlet />
      </Stack>
    </Stack>
  );
};
