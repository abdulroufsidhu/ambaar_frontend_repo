import { Button, Stack, TextField, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { routes } from "./router";
import { useState } from "react";
import { User, IUser } from "../../shared/models/user";
import { Create, LoginOutlined } from "@mui/icons-material";
import useAppContext from "../../shared/hooks/app-context";

export const Login = () => {
  const [context, dispatch] = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    !!context.navigate && context.navigate(routes.SIGNUP);
  };

  const handleLogin = () => {
    User.login(email, password)
      .then((res) => {
        dispatch({ action: "SET_USER", payload: { user: res } });
        !!context.navigate && context.navigate("/items");
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

interface SignupProps {
  onSuccess: (user: IUser) => undefined;
}

export const Signup = ({ onSuccess }: SignupProps) => {
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [contact, setcontact] = useState("");
  const [nationalId, setnationalId] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleSignupButton = () => {
    if (password === confirmPassword) {
      User.signup(
        {
          contact: contact,
          email: email,
          nationalId: nationalId,
          username: username,
          name: name,
        },
        password
      )
        .then(onSuccess)
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <TextField
        value={name}
        variant="outlined"
        label="Name*"
        type="text"
        onChange={(e) => setname(e.target.value)}
      />
      <TextField
        value={username}
        variant="outlined"
        label="username*"
        type="text"
        onChange={(e) => setusername(e.target.value)}
      />
      <TextField
        value={contact}
        variant="outlined"
        label="Contact*"
        type="text"
        onChange={(e) => setcontact(e.target.value)}
      />
      <TextField
        value={nationalId}
        variant="outlined"
        label="National id*"
        type="text"
        onChange={(e) => setnationalId(e.target.value)}
      />
      <TextField
        value={email}
        variant="outlined"
        label="Email*"
        type="email"
        onChange={(e) => setemail(e.target.value)}
      />
      <TextField
        value={password}
        variant="outlined"
        label="Password*"
        type="password"
        onChange={(e) => setpassword(e.target.value)}
      />
      <TextField
        value={confirmPassword}
        variant="outlined"
        label="Confirm Password*"
        type="password"
        onChange={(e) => setconfirmPassword(e.target.value)}
      />
      <Button
        variant="outlined"
        onClick={handleSignupButton}
        startIcon={<Create></Create>}
      >
        Signup
      </Button>
    </>
  );
};

export const AuthMain = () => {
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
