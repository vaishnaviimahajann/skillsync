# 🔗 SkillSync — MERN Stack Project

College students ko skill-based teammates dhundhne ka platform.

## 📁 Structure

```
skillsync/
├── backend/
│   ├── server.js              ← entry point, wires everything together
│   ├── config/db.js            ← MongoDB connection
│   ├── models/                 ← User.js, Connection.js, Message.js
│   ├── controllers/            ← auth, user, connection, message logic
│   ├── routes/                 ← auth, user, connection, message routes
│   ├── middleware/auth.js      ← JWT verification
│   ├── utils/                  ← jwt.js, formatUser.js, socketHandlers.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx              ← routing
        ├── api.js                ← axios client
        ├── styles.css            ← white + blue theme
        ├── context/AuthContext.jsx
        ├── components/Navbar.jsx
        ├── components/ProtectedRoute.jsx
        └── pages/ (Home, Login, Signup, Dashboard, Discover, Connections, Profile, Chat)
```

## ⚡ Setup

### 1. Backend
```bash
cd backend
npm install
copy .env.example .env
# .env kholo, <db_password> ko apne actual MongoDB Atlas password se replace karo
node server.js
```

### 2. Frontend (naya terminal)
```bash
cd frontend
npm install
npm run dev
```

## 🛠 Tech Stack
- Frontend: React + Vite + React Router
- Backend: Node.js + Express (MVC structure) + Socket.io
- Database: MongoDB + Mongoose
- Auth: JWT + Bcrypt

## 🔑 API Endpoints
- POST /api/auth/signup, POST /api/auth/login, GET /api/auth/me
- PUT /api/users/profile, GET /api/users/discover?search=&skill=
- POST /api/connections/send, GET /api/connections, PUT /api/connections/:id
- GET /api/messages/:userId

© 2026 SkillSync
