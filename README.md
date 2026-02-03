# Realtime Chat Application

A realtime room-based chat application built using React, Node.js, Express, MongoDB, and Socket.IO.  
The app supports authentication, protected chat rooms, live participants updates, and realtime messaging with message persistence.

---

## Features

- JWT based Authentication (Login / Signup)
- Create and Join Chat Rooms using Room ID
- Protected Routes (Unauthorized users redirected)
- Realtime Messaging using Socket.IO
- Live Participants Count per Room
- Message Persistence with MongoDB
- Automatic Room Validation (Invalid room IDs redirect to Dashboard)
- Modern UI with consistent dark theme

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Socket.IO Client
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Passport JWT
- Socket.IO

---

## Project Structure

client/
- src/
  - pages/
  - context/
  - socket.js
  - App.jsx

server/
- src/
  - controllers/
  - models/
  - repository/
  - service/
  - routes/
  - auth/
  - index.js

---

## Environment Variables

### Frontend (.env)
VITE_API_URL=http://localhost:3000

### Backend (.env)
PORT=3000  
MONGO_URI=mongodb://localhost:27017/chat_app  
JWT_SECRET=your_secret_key  
FRONTEND_URL=http://localhost:5173  

---

## How to Run Locally

### Backend
cd server  
npm install  
npm run dev  

### Frontend
cd client  
npm install  
npm run dev  

---

## Realtime Logic

- Users join rooms via Socket.IO
- Messages are saved in MongoDB and broadcasted in realtime
- Participants count updates live when users join or leave
- Offline users receive all missed messages when they rejoin

---

## Route Protection

- Invalid Room ID redirects user to Dashboard
- Users not part of a room cannot access it via URL
- JWT token required for all protected routes

---

## Future Enhancements

- Typing indicators
- Online / Offline status
- Message read receipts
- Media sharing
- Room admin controls

---

## Author

Built by Moulendu

---

## License

Open source project, free to use and modify
