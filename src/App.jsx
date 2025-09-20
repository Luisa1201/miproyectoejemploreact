import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard"; 

function App() {
  const [view, setView] = useState("login"); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView("login");
  };

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />; 
  }

  return (
    <div className="App">
      {view === "login" && (
        <LoginPage
          onRegisterClick={() => setView("register")}
          onForgotClick={() => setView("forgot")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {view === "register" && (
        <RegisterForm onBackToLogin={() => setView("login")} />
      )}

      {view === "forgot" && (
        <ForgotPassword onBackToLogin={() => setView("login")} />
      )}
    </div>
  );
}

export default App;