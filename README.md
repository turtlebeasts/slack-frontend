# Real-Time Chat Application

Full-Stack Internship Assignment – DeeRef Labs

A full-stack real-time chat platform where users can register, create or join channels, chat with others instantly, and see online presence in real-time.

---

## Features

### Authentication

- Secure JWT-based login & registration
- Protected routes for chat
- Session persistence

### Channels

- Create channels
- Join / Leave channels
- Joined channels displayed separately

### Real-Time Messaging

- WebSockets with Socket.IO
- Live delivery between multiple users
- Shows sender name + timestamp
- Load older messages with cursor pagination

### Online Presence

- Shows online/offline users in every channel
- Real-time presence sync

### Responsive UI

- Desktop → 3-column layout
- Mobile → stacked layout
- Proper loading states with spinners

### Deployment

- Frontend hosted on Netlify:  
  https://slackk.netlify.app

---

## Tech Stack

| Layer      | Technology                         |
| ---------- | ---------------------------------- |
| Frontend   | React + Vite + TailwindCSS + Axios |
| Backend    | Node.js + Express.js               |
| Realtime   | Socket.IO                          |
| Database   | PostgreSQL (Supabase)              |
| Auth       | JWT                                |
| Deployment | Netlify (Frontend)                 |

---

## Folder Structure Overview

### Backend

src/
├─ routes/
├─ sockets/
├─ middleware/
├─ db.js
├─ app.js
└─ index.js

### Frontend

src/
├─ components/
├─ pages/
├─ hooks/
├─ shared/
└─ App.jsx

---

## Environment Variables

### Frontend .env

VITE_API_URL=https://<your-backend>.fly.dev/api

---

## Run Project Locally

### Frontend

cd frontend
npm install
npm run dev

Open:  
👉 http://localhost:5173

---

## 📈 Future Enhancements

- Direct Messages (DMs)
- File uploads
- Typing indicators
- Admin roles
- Message edit/delete

---

## 👨‍💻 Developer

**Mriganka Das**  
GitHub: https://github.com/turtlebeasts
