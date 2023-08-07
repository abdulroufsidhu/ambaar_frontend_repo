import { Button, Container, Stack, TextField } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <>
      <Stack
        minHeight={window.innerHeight - 120}
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="end"
      >
        <Stack
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          flexGrow={0.5}
        >
          <TextField variant="outlined" label="email" type="email" />
          <TextField variant="outlined" label="password" type="password" />
          <Button variant="outlined">Login</Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Login;
