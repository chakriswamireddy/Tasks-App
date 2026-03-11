# Task Management Application (Frontend Only)

A modern task management application built with **React + TypeScript** that simulates authentication and task CRUD operations using a **mocked API layer**. The project demonstrates clean architecture, state management with Redux Toolkit, and API simulation using Mock Service Worker.

---

## Overview

This application allows users to log in, create tasks, update task details, track task status, and delete tasks. All backend functionality is simulated directly within the frontend using a mock API layer. This allows the application to behave like a real full stack system without requiring a backend server.

The project focuses on clean code structure, reusable components, state management patterns, and testable architecture.

---

## Features

User authentication with a simulated login flow
Protected dashboard accessible only after login
Create, edit, update, and delete tasks
Task status tracking (To Do, In Progress, Done)
Mock backend powered by Mock Service Worker
State management using Redux Toolkit
Responsive UI built with Tailwind CSS and Ant Design
Unit tests written with Jest and React Testing Library
State persistence using localStorage
Clean modular architecture suitable for production scale applications

---

## Tech Stack

**Framework**
React with Vite

**Language**
TypeScript

**State Management**
Redux Toolkit

**UI Libraries**
Ant Design
Tailwind CSS

**Mock API Layer**
Mock Service Worker (MSW)

**HTTP Client**
Axios

**Testing**
Jest
React Testing Library

---

## Application Flow

1. The user logs in using predefined credentials.
2. The application receives a fake JWT token from the mocked API.
3. The token is stored in localStorage to simulate a session.
4. Protected routes verify the token before allowing access.
5. Task operations interact with mocked endpoints.
6. The MSW layer intercepts HTTP requests and returns simulated responses.

---

## Mock Authentication

A static user is predefined in the mock API.

```
Username: test
Password: test123
```

When these credentials are submitted, the mocked `/login` endpoint returns a fake token.

Example response:

```
{
  "token": "fake-jwt-token-123456",
  "username": "test"
}
```

If credentials do not match, the API returns a 401 error.

---

## Mock API Implementation

Mock Service Worker intercepts HTTP requests at the network layer and returns predefined responses.

Handlers are defined inside:

```
src/mocks/handlers/
```

### Authentication Endpoint

```
POST /login
```

Returns a fake JWT token if credentials match the static user.

---

### Task Endpoints

```
GET /tasks
```

Returns the list of tasks.

```
POST /tasks
```

Creates a new task and generates a sequential ID.

```
PUT /tasks/:id
```

Updates an existing task.

```
DELETE /tasks/:id
```

Deletes a task from the list.

The task data is stored in memory inside the handler file to simulate a database.

---

## Project Structure

```
src
 ├ app
 │   store.ts
 │   hooks.ts
 │
 ├ features
 │   ├ auth
 │   │   AuthAPI.ts
 │   │   authSlice.ts
 │   │   pages/LoginPage.tsx
 │   │
 │   ├ tasks
 │   │   taskAPI.ts
 │   │   taskSlice.ts
 │   │   types.ts
 │   │   components/TaskForm.tsx
 │   │   pages/Dashboard.tsx
 │
 ├ mocks
 │   handlers/authHandlers.ts
 │   handlers/taskHandlers.ts
 │   browser.ts
 │
 ├ routes
 │   ProtectedRoute.tsx
 │
 ├ services
 │   axiosClient.ts
 │
 ├ setupTests.ts
 │
 └ main.tsx
```

---

## Running the Project Locally

### 1. Clone the repository

```
git clone <repository-url>
```

### 2. Install dependencies

```
npm install
```

### 3. Start the development server

```
npm run dev
```

The application will run on:

```
http://localhost:5173
```

---

## Running Tests

Execute unit tests using:

```
npm run test
```

Watch mode:

```
npm run test:watch
```

The test suite covers:

Redux slices
API utilities
Mock handlers
React components
Route protection

---

## Deployment

The application can be deployed to any static hosting provider.

Recommended options:

Vercel
Netlify

### Build the project

```
npm run build
```

### Preview production build

```
npm run preview
```

---

## Future Enhancements

Dark mode support
Task filtering and search
Drag and drop task ordering
User registration flow
Backend integration with a real API

---

## Summary

This project demonstrates how a fully functional frontend application can simulate backend behavior using Mock Service Worker. It showcases modern React patterns, scalable architecture, and strong testing practices while remaining lightweight and easy to run locally.
