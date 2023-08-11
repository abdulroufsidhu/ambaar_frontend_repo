import { Button, Stack, TextField, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { routes } from "./router";
import { useState } from "react";
import { User } from "../../shared/models/user";
import { Create, LoginOutlined } from "@mui/icons-material";

export const Login = () => {
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
      <Button
        variant="outlined"
        onClick={handleLoginButton}
        startIcon={<LoginOutlined />}
      >
        Login
      </Button>
      <Button
        variant="text"
        onClick={handleSignupButton}
        startIcon={<Create />}
      >
        Signup
      </Button>
    </>
  );
};

export const Signup = () => {
  const navigate = useNavigate();
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
        .then((response) => {
          console.info("signup success: ", response);
          navigate("/items");
        })
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