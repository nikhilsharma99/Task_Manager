
# Task Management System

A simple and efficient Task Management System built for small startups and remote teams to manage tasks, collaborate, and assign responsibilities. It provides user registration, secure login, task creation, assignment, and team management using a modern tech stack.

---

## Features

- Register and Login (JWT-based authentication)
- Add, edit, delete tasks
- Assign tasks to users
- Manage team members
- Responsive and clean UI using Material-UI
- MongoDB database integration
- Thunder Client/Postman API testing support

---

## Tech Stack

Frontend
- React.js
- Material-UI

Backend
- Node.js
- Express.js
- MongoDB with Mongoose

Authentication
- JWT (JSON Web Token)
- bcrypt for password hashing

---

##  Folder Structure

```
task-manager/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── controllers/ (optional)
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.js
│   └── public/
│
├── .env
└── README.md
```

---

##  Environment Variables

Create a `.env` file in the `backend` directory with the following:

```env
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

---

## How to Run

### 1. Clone the Repository

```bash

cd task-manager
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Start Backend Server

```bash
cd ../backend
npx nodemon server.js
```

### 5. Start Frontend

```bash
cd ../frontend
npm start
```

---

## Testing

Use Thunder Client to test API endpoints:

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login user and receive JWT token
- `GET /api/tasks` — Get all tasks (requires token)
- `POST /api/tasks` — Create task (requires token)

---
