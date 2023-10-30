import { LoginOutlined, Create } from "@mui/icons-material";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import useAppContext from "../../shared/hooks/app-context";
import { User } from "../../shared/models/user";
import { ClientUrls } from "../../shared/routes";


export const Login = () => {
  const [context, dispatch] = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    !!context.navigate && context.navigate(ClientUrls.auth.signup);
  };

  const handleLogin = () => {
    User.login(email, password)
      .then((res) => {
        !!context.navigate && context.navigate(ClientUrls.inventory.base);
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
      <Button
        variant="outlined"
        onClick={handleLogin}
        startIcon={<LoginOutlined />}
      >
        Login
      </Button>
      <Button variant="text" onClick={handleSignup} startIcon={<Create />}>
        Signup
      </Button>
    </>
  );
};