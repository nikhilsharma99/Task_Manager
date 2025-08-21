import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error.message);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.trim()) return;
    try {
      await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUser, email: `${newUser.toLowerCase()}@example.com` }),
      });
      setNewUser('');
      loadUsers();
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Team Members
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="New User Name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddUser}>
          Add User
        </Button>
      </Stack>
      <List>
        {users.map((user) => (
          <ListItem key={user._id} divider>
            <ListItemText primary={user.name} secondary={user.email} />
            <ListItemSecondaryAction>
              <IconButton edge="end" color="error" onClick={() => handleDeleteUser(user._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default UserManagement;
