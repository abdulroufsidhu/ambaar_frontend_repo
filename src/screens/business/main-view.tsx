import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export const BusinessMain = () => {
  return (
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        margin={2}
      >
        <Outlet />
      </Stack>
    </>
  );
};