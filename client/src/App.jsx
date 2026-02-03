import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/login_signup";
import Dashboard from "./pages/dashboard";
import ChatRoom from "./pages/ChatRoom";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Auth modeProp="login" />} />
        <Route path="/signup" element={<Auth modeProp="signup" />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/room/:roomId"
          element={
            <ProtectedRoute>
              <ChatRoom />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
