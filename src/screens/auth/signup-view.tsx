import { Create } from "@mui/icons-material";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { IUser, User } from "../../shared/models/user";

interface SignupProps {
  onSuccess: (user: IUser | undefined) => void;
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
        .then(user => onSuccess(user))
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
