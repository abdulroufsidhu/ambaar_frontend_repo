import { Container, Fab } from "@mui/material";
import { ReactNode } from "react";

interface MyFabProps {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  label: string;
  onClick?: () => undefined;
}

export const MyFab = ({ label, startIcon, endIcon, onClick }: MyFabProps) => {
  return (
    <Container
      sx={{
        position: "sticky",
        bottom: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem",
      }}
    >
      <Fab aria-label="add" variant="extended" onClick={onClick}>
        {!!startIcon && startIcon}
        {label}
        {!!endIcon && endIcon}
      </Fab>
    </Container>
  );
};
