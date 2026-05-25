import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Chat from "./pages/Chat";
import { Container } from "react-bootstrap";
import NavBar from "./components/home/NavBar";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import VerificationForm from "./pages/auth/Sentcode";
import Footer from "./components/home/Footer";
import MessagePage from "./pages/message/MessagePage";
import ProtectedRoute from "./components/ProtectedRoute";
import userStore from "./stores/authStore";

function App() {
  const isAuthenticated = userStore((state) => state.isAuthenticated);
  const location = useLocation();

  // Ẩn NavBar và Footer khi ở trang message
  const isMessagePage = location.pathname === "/message";

  return (
    <>
      {!isMessagePage && !isAuthenticated && <NavBar />}

      {!isMessagePage ? (
        <Container className="text-secondary">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/message" replace /> : <Chat />
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/message" replace />
                ) : (
                  <Register />
                )
              }
            />
            <Route
              path="/verify"
              element={
                isAuthenticated ? (
                  <Navigate to="/message" replace />
                ) : (
                  <VerificationForm />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/message" replace /> : <Login />
              }
            />
            <Route
              path="/message"
              element={
                <ProtectedRoute>
                  <MessagePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      ) : (
        <Routes>
          <Route
            path="/message"
            element={
              <ProtectedRoute>
                <MessagePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}

      {!isMessagePage && !isAuthenticated && <Footer />}
    </>
  );
}

export default App;
