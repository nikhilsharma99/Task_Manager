const API_BASE_URL = 'http://localhost:5000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('authToken');
  return {
    Authorization: `Basic ${token}`,
    'Content-Type': 'application/json',
  };
}

export async function fetchTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return await response.json();
}

export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch users');
  return await response.json();
}

export async function createTask(taskData) {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return await response.json();
}
