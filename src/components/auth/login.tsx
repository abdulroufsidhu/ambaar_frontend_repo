import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "./router";
import { useState } from "react";
import { User } from "../../shared/models/user";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupButton = () => {
    navigate(routes.SIGNUP);
  };

  const handleLoginButton = () => {
    User.login(email, password)
      .then((res) => {
        console.log(res);
        navigate("/items");
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .catch((error) => console.error(error.request.response));
  };

  return (
    <>
      <TextField
        variant="outlined"
        label="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        label="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
      />
      <Button variant="outlined" onClick={handleLoginButton}>
        Login
      </Button>
      <Button variant="text" onClick={handleSignupButton}>
        Signup
      </Button>
    </>
  );
};

export default Login;
