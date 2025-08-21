import React, { useEffect, useState } from 'react';
import { fetchTasks, fetchUsers, createTask } from './services/api';
import Login from './components/Login';
import Register from './components/Register';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [showRegister, setShowRegister] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [assignedUser, setAssignedUser] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      loadTasks();
      loadUsers();
    }
  }, [isLoggedIn]);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error.message);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error.message);
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.trim()) return;
    const taskData = { title: newTask, assignedTo: assignedUser };
    try {
      await createTask(taskData);
      setNewTask('');
      setAssignedUser('');
      loadTasks();
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  // 🔥 Authentication views toggle
  if (!isLoggedIn) {
    return showRegister ? (
      <Register onRegister={() => setShowRegister(false)} />
    ) : (
      <Box>
        <Login
          onLogin={() => setIsLoggedIn(true)}
          onSwitchToRegister={() => setShowRegister(true)}
        />
        <Box textAlign="center" mt={2}>
          <Button onClick={() => setShowRegister(true)}>
            Don&apos;t have an account? Register
          </Button>
        </Box>
      </Box>
    );
  }

  // 🔥 Main app UI
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management System
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Hello, {localStorage.getItem('userName')}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('userName');
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Task Creation */}
        <Paper elevation={4} sx={{ p: 3, backgroundColor: '#ffffff' }}>
          <Typography variant="h5" gutterBottom>
            Create New Task
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="Task Title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Assign To</InputLabel>
              <Select
                value={assignedUser}
                label="Assign To"
                onChange={(e) => setAssignedUser(e.target.value)}
              >
                <MenuItem value="">
                  <em>Unassigned</em>
                </MenuItem>
                {users.map((user) => (
                  <MenuItem key={user._id} value={user.name}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleCreateTask}>
              Add Task
            </Button>
          </Stack>
        </Paper>

        {/* Tasks Overview */}
        <Typography variant="h5" gutterBottom>
          Tasks Overview
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {tasks.length === 0 ? (
            <Typography>No tasks found.</Typography>
          ) : (
            tasks.map((task) => (
              <Paper key={task._id} elevation={2} sx={{ p: 2 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: '#1976d2' }}>
                      <PersonIcon />
                    </Avatar>
                  }
                  title={task.title}
                  subheader={`Assigned to: ${task.assignedTo || 'Unassigned'}`}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Status: {task.status}
                  </Typography>
                </CardContent>
              </Paper>
            ))
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default App;
