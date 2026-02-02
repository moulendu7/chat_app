```md
# 💬 Real-Time Chat Application

A secure, real-time multi-room chat application built with React, Node.js, Socket.IO, and MongoDB.  
Users can create rooms, join rooms using a Room ID, and chat in real time with live participant updates and message persistence.

---

## ✨ Features

- JWT authentication (login & signup)
- Create & join chat rooms
- Room access validation (URL tamper protection)
- Live participant updates
- Real-time messaging (Socket.IO)
- Message persistence (MongoDB)
- Offline users receive messages on rejoin
- No duplicate messages
- Deployed frontend & backend separately
- Clean layered architecture (Controller → Service → Repository)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Socket.IO Client
- React Router
- Lucide Icons

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB (Mongoose)
- Passport JWT
- UUID

### Deployment
- Frontend → Vercel (free)
- Backend → Render (free)
- Database → MongoDB Atlas (free)

---

## 🧩 Architecture

Frontend (Vercel) → Backend (Render) → Database (MongoDB Atlas)

Sockets handle real-time events, database is the source of truth.

---

## 📁 Project Structure

```

chat-app/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── socket.js
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── socket.js
│   │   └── index.js
│   └── package.json
│
└── README.md

```

---

## ⚙️ Environment Variables

### Backend (`server/.env`)
```

MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
PORT=3000

```

### Frontend (`client/.env`)
```

VITE_API_URL=[https://your-backend.onrender.com](https://your-backend.onrender.com)

````

---

## 🚀 Running Locally

### Backend
```bash
cd server
npm install
npm run dev
````

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔌 Socket Events

| Event               | Description                |
| ------------------- | -------------------------- |
| join-room           | Join socket room           |
| participant-updated | Notify participant changes |
| send-message        | Send message               |
| receive-message     | Receive message            |

---

## 🔐 Security

* JWT protected routes
* Server-side room validation
* URL tamper protection
* Secure environment variables
* Database hosted on MongoDB Atlas

---

## 📦 Deployment (Free)

* Backend → Render
* Frontend → Vercel
* Database → MongoDB Atlas

---

## 🧪 Test Checklist

* Login / Signup works
* Create room
* Join room
* Live participant update
* Live chat messaging
* Message history reload
* Access validation
* Socket reconnect works

---

## 📌 Future Improvements

* Typing indicator
* Online/offline presence
* Read receipts
* File sharing
* Push notifications
* Redis socket adapter

---

## 👨‍💻 Author

Moulendu Khanra
Full Stack Developer • IIIT Ranchi

---

## ⭐ Support

If you like this project, give it a star and feel free to fork & improve it.

```
```
"# chat_app" 
