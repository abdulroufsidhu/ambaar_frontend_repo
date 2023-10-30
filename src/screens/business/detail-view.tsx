import { Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { IBusiness } from "../../shared/models/business";

export const BusinessView = () => {
  const business = useLocation().state as IBusiness;

  return (
    <>
      <Stack direction="row" flexWrap="wrap" spacing={2}>
        <Stack padding={4}>
          <Typography variant="h5">{business.name}</Typography>
          <Typography variant="subtitle1">{business.contact}</Typography>
          <Typography variant="subtitle1">{business.email}</Typography>
          <Typography variant="subtitle1">{business.licence}</Typography>
        </Stack>
      </Stack>
    </>
  );
};
