import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../../shared/models/user";

const Signup = () => {
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
      <Button variant="outlined" onClick={handleSignupButton}>
        Signup
      </Button>
    </>
  );
};

export default Signup;
