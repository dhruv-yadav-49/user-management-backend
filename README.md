🚀 Backend Developer Intern Assessment
Mini User Management System
📌 Project Overview

This project is a Mini User Management System built as part of the Backend Developer Intern Assessment.
The application supports user authentication, role-based access control (RBAC), and basic user lifecycle management.

The system allows:

Users to sign up, log in, view & update their profile.

Admins to manage users (activate / deactivate).

Secure API access using JWT authentication.

Full deployment with cloud database and live URLs.

🛠 Tech Stack
Backend

Node.js

Express.js

MongoDB (MongoDB Atlas)

Mongoose

JWT Authentication

bcrypt (password hashing)

Frontend

React.js (Hooks)

Axios

React Router

Deployment

Backend: Render

Frontend: Vercel

Database: MongoDB Atlas

🌐 Live Deployment Links

Frontend:
👉 https://user-management-frontend-pearl-eight.vercel.app/

Backend API:
👉 https://user-management-backend-i2t6.onrender.com

Health Check Endpoint:
👉 https://user-management-backend-i2t6.onrender.com/api/health

🔐 Features Implemented
Authentication

User Signup (email, password, full name)

User Login

JWT-based authentication

Password hashing using bcrypt

Logout functionality

Role-Based Access Control (RBAC)

User Role

View & update profile

Change password

Admin Role

View all users (with pagination)

Activate / Deactivate user accounts

Security

Protected routes using JWT middleware

Role-based authorization

Input validation on all endpoints

Environment variables for sensitive data

Proper HTTP status codes & error handling

📂 Project Structure
backend-intern-assessment/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── README.md
└── .gitignore

⚙️ Environment Variables

Create a .env file inside the backend folder with the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000


📌 Note:
.env files are excluded from the repository using .gitignore.

▶️ Setup Instructions (Local)
1️⃣ Clone the Repository
git clone https://github.com/your-username/backend-intern-assessment.git

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Backend will run at:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm start


Frontend will run at:

http://localhost:3000

📡 API Endpoints (Sample)
Authentication
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout

User
GET  /api/users/profile
PUT  /api/users/profile
PUT  /api/users/change-password

Admin
GET  /api/admin/users
PUT  /api/admin/users/:id/activate
PUT  /api/admin/users/:id/deactivate

🧪 Testing

Manual API testing performed using Postman

JWT-protected routes verified

Role-based access tested for both admin and user roles

🎥 Walkthrough Video

A complete walkthrough video demonstrating:

Authentication flow

Role-based access

Admin & User dashboards

API testing

Live deployment

📎 Video Link:
👉 https://your-video-link

📦 Deployment Notes

Backend deployed on Render

Frontend deployed on Vercel

MongoDB hosted on MongoDB Atlas

Environment variables configured securely on hosting platforms

👤 Author

Dhruv Yadav
Backend Developer Intern Applicant