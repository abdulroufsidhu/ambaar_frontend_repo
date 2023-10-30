import { Stack, Typography } from "@mui/material";
import { IBranch } from "../../shared/models/branch";

interface BranchViewProps {
  branch: IBranch;
}

export const BranchView = ({ branch }: BranchViewProps) => {
  return (
    <>
      <Stack padding={2}>
        <Typography variant="h5">{branch.name}</Typography>
        {typeof branch.business != "string" && !!branch.business?.name && (
          <Typography variant="h6">{branch.business?.name}</Typography>
        )}
        <Typography variant="subtitle1">{branch.contact}</Typography>
        <Typography variant="subtitle1">{branch.email}</Typography>
        <Typography variant="subtitle1">{branch.location}</Typography>
      </Stack>
    </>
  );
};
