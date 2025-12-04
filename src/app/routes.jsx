import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import ChatPage from "../features/chat/pages/ChatPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LandingPage from "../features/landing/LandingPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  );
}
