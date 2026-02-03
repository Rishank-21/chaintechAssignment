# Chaintech Assignment – Account Management App

This repository contains a small React application built for the PR: REACTIIP01002 interview assignment.  
The goal is to allow a user to register, log in, and view/edit their account details. All data is stored
locally in the browser using `localStorage` (no backend).

The app focuses on clean, readable code and simple UI with basic validation and error handling.

---

## Project Summary

The application has three main pages:
1. **Register** – create a new account with full name, email, and password.
2. **Login** – sign in with email and password.
3. **Profile** – view account details and update full name or password.

Routes are protected so that unauthenticated users cannot access the profile page.

---

## Features

- Registration with validation and duplicate email check
- Login with credential check
- Protected profile page (auth guard)
- Edit profile (full name + password only)
- Logout
- Clear error messages

---

## Tech Stack

- **React 19** (Vite)
- **React Router** for routing
- **Tailwind CSS** for styling
- **Bootstrap** included (light use)
- **LocalStorage** for data persistence

---

## How It Works

### Registration
When a new user registers:
- The form validates input fields.
- The email is checked against existing users in `localStorage`.
- If valid, the user is added to the `users` array in `localStorage`.

### Login
When logging in:
- The email and password are validated.
- If credentials match a user in `localStorage`, that user is saved as `currentUser`.
- The user is redirected to the profile page.

### Profile
On the profile page:
- User data is loaded from `currentUser`.
- The email is shown but locked to avoid changing identity.
- Full name and password can be edited and saved.
- Changes update both `currentUser` and `users` in `localStorage`.

---

## Routes

- `/register` – registration page  
- `/login` – login page  
- `/` – profile page (protected)

Protected routes redirect to `/login` if no user is logged in.  
Public routes redirect to `/` if the user is already logged in.

---

## Local Storage Keys

- `users` – array of registered users  
- `currentUser` – the currently logged in user  

Example structure:
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Setup Instructions

1. Install dependencies
```bash
npm install
```

2. Run the app locally
```bash
npm run dev
```

3. Open the URL shown in your terminal

---

## Folder Structure (Important Files)

- `project/src/pages/Register.jsx` – Registration form
- `project/src/pages/Login.jsx` – Login form
- `project/src/pages/Profile.jsx` – Profile view/edit
- `project/src/routes/ProtectedRoute.jsx` – Protected route wrapper
- `project/src/routes/PublicRoute.jsx` – Public route wrapper
- `project/src/App.jsx` – Route setup

---

## Assignment Requirements Coverage

- ✅ Login page  
- ✅ Registration page  
- ✅ Account profile page (view/edit)  
- ✅ Basic styling  
- ✅ Error handling  
- ✅ Clear, simple code  

---

## Notes

- This is a demo app for interview purposes.  
- Passwords are stored in plain text in `localStorage` for simplicity.  
- In a real-world app, passwords should always be hashed and stored securely on a backend.

---

## Author

**Rishank**  
React Intern Assignment – Chaintech
