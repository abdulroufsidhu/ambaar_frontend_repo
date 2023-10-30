import React, { useState } from 'react';
import { Button, TextField, Grid, Container, Typography, Alert } from '@mui/material';

interface ChangePasswordProps {
  onSubmit: (oldPassword: string, newPassword: string, confirmNewPassword: string) => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({ onSubmit }: ChangePasswordProps) => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add validation and password change logic here
    if (newPassword !== confirmNewPassword) {
      setError("New passwords don't match.");
    } else {
      // Call the onSubmit callback with the entered values
      onSubmit(oldPassword, newPassword, confirmNewPassword);
    }
  };

  return (
    <Container>
      <Grid container justifyContent="start" alignItems="start" >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" component="h2" gutterBottom>
              Change Password
            </Typography>
            <TextField
              label="Old Password"
              type="password"
              fullWidth
              margin="normal"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              style={{ marginTop: '16px' }}
            >
              Change Password
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
