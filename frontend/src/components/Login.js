import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return;
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token); // store JWT
        localStorage.setItem('userName', data.name);   // store user's name
        onLogin();
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please try again later.');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ mb: 2 }}
          >
            Login
          </Button>

          <Typography variant="body2" align="center">
            Don&apos;t have an account?
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={onSwitchToRegister}
            sx={{ mt: 1 }}
          >
            Register Here
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
