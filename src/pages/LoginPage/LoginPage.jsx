import React, { useState } from "react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import "./LoginPage.css";

function LoginPage({ onRegisterClick, onForgotClick, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //  Validación básica de usuario demo
    if (email === "luda@gmail.com" && password === "1234") {
      onLoginSuccess(); // pasa al dashboard
    } else {
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-body">
    <div className="login-container">
      <div className="login-header">
        <img 
          src="/img/welcome.png"   
          alt="Bienvenido" 
          className="welcome-img"
        />
        <h2>¡Bienvenido!</h2>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit" className="login-btn">Ingresar</button>
      </form>

      <p className="forgot-password">
        <span className="forgot-link" onClick={onForgotClick}>
          ¿Olvidaste tu contraseña?
        </span>
      </p>

      <div className="social-login">
        <p>O ingresa con</p>
        <div className="social-buttons">
          <button type="button" className="google-btn">
            <FaGoogle className="icon" /> Google
          </button>
          <button type="button" className="github-btn">
            <FaGithub className="icon" /> GitHub
          </button>
          <button type="button" className="facebook-btn">
            <FaFacebook className="icon" /> Facebook
          </button>
        </div>
      </div>

      <p className="auth-text">
        ¿No tienes cuenta?{" "}
        <button type="button" className="register-btn" onClick={onRegisterClick}>
          Regístrate
        </button>
      </p>
    </div>
    </div>
  );
}

export default LoginPage;
