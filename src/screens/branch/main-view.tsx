import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export const BranchMain = () => {
  return (
    <Stack justifyContent="center" alignItems="center" margin={2}>
      <Outlet />
    </Stack>
  );
};
